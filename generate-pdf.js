#!/usr/bin/env node
const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/snap/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('file:///home/ubuntu/my-portfolio/CV_M_Fahmi_Hassan.html', { waitUntil: 'networkidle0' });
  
  // Inject print-specific CSS overrides
  await page.addStyleTag({ content: `
    .page {
      box-shadow: none !important;
      margin: 0 !important;
      padding: 0 !important;
      max-width: none !important;
    }
    body {
      padding: 0 !important;
      margin: 0 !important;
      background: none !important;
    }
    section { margin-bottom: 0.8rem !important; }
    header { padding-bottom: 0.5rem !important; margin-bottom: 0.8rem !important; }
    h1 { font-size: 1.8rem !important; margin: 0 0 0.2rem 0 !important; }
    .role { font-size: 1rem !important; margin: 0 0 0.4rem 0 !important; }
    .contact-info { font-size: 0.8rem !important; gap: 0.75rem !important; }
    h2 { font-size: 0.9rem !important; padding-bottom: 0.25rem !important; margin-bottom: 0.5rem !important; }
    .experience-item { margin-bottom: 0.8rem !important; }
    .job-title { margin-bottom: 0.2rem !important; }
    li { font-size: 0.85rem !important; margin-bottom: 0.1rem !important; }
    .skills-grid { gap: 0.25rem 1.5rem !important; }
    ul { padding-left: 1rem !important; }
  `});

  await page.pdf({
    path: '/home/ubuntu/my-portfolio/CV_M_Fahmi_Hassan.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '12mm', left: '15mm' }
  });
  await browser.close();
  console.log('PDF generated');
})();
