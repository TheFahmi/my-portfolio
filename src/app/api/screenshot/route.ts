import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

const CACHE_DIR = join(process.cwd(), '.screenshot-cache');
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getCachePath(url: string): string {
  const hash = createHash('md5').update(url).digest('hex');
  return join(CACHE_DIR, `${hash}.png`);
}

function isCacheValid(filePath: string): boolean {
  try {
    const stat = statSync(filePath);
    return Date.now() - stat.mtimeMs < CACHE_TTL_MS;
  } catch {
    return false;
  }
}

function findChrome(): string {
  const paths = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];

  for (const p of paths) {
    if (existsSync(p)) return p;
  }

  throw new Error('Chrome not found. Install Google Chrome or Chromium.');
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing ?url= parameter' }, { status: 400 });
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  // Ensure cache directory exists
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  const cachePath = getCachePath(url);

  // Serve from cache if valid
  if (existsSync(cachePath) && isCacheValid(cachePath)) {
    const cached = readFileSync(cachePath);
    return new NextResponse(cached, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
        'X-Cache': 'HIT',
      },
    });
  }

  // Take screenshot
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: findChrome(),
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait a moment for any animations to settle
    await new Promise((r) => setTimeout(r, 1500));

    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1280, height: 720 },
    }) as Buffer;

    // Cache the screenshot
    writeFileSync(cachePath, screenshot);

    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
        'X-Cache': 'MISS',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Screenshot failed';
    console.error('Screenshot error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
