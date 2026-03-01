# Project Conventions

## Screenshot untuk Project Baru

Ketika menambahkan project baru ke `siteConfig.projects`, ambil screenshot viewport dari URL demo-nya:

1. **Buka URL** pakai Playwright MCP: `browser_navigate` ke URL demo
2. **Resize ke 1280x720**: `browser_resize` width=1280 height=720
3. **Tunggu page load**: `browser_wait_for` time=3-5 detik (biar data/animasi settle)
4. **Simpan screenshot viewport** (BUKAN fullPage):
   ```js
   // via browser_run_code
   async (page) => {
     await page.screenshot({
       path: '/mnt/data/Project/my-portfolio/public/images/project-<name>.png',
       type: 'png'
     });
     return 'done';
   }
   ```
5. **Update siteConfig**: set `image: '/images/project-<name>.png'`

**Naming**: `project-<name>.png` (lowercase, kebab-case). Contoh: `project-poke.png`, `project-merdu.png`

**Jangan**: pakai `fullPage: true` — yang lain semua viewport-only 1280x720.
