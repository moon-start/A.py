import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { glob } from 'glob';

import liveReload from 'vite-plugin-live-reload';

function moveOutputPlugin() {
  return {
    name: 'move-output',
    enforce: 'post',
    apply: 'build',
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith('pages/')) {
          const newFileName = fileName.slice('pages/'.length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

export default defineConfig({
  // base 的寫法：
  // base: '/Repository 的名稱/'
  base: '/A.py/',
  plugins: [
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html']),
    ViteEjsPlugin(),
    moveOutputPlugin(),
  ],
  server: {
    // host: 'localhost', // localhost 主機名稱
    // port: 3000,        // 端口號
    //-----------------------------------
    // package.json
    // "dev": "vite --no-open --port 80",
    // http://localhost/moon-start/pages/
    // 啟動 server 時預設開啟的頁面
    open: 'pages/index.html',
    // "dev": "vite --no-open --port 80",
    // npm run dev
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('pages/**/*.html')
          .map((file) => [
            path.relative('pages', file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    outDir: 'dist',
  },
});



// npm install -g gh-pages

// npm run build # 使用你的構建指令，生成構建內容至 dist 目錄
// gh-pages -d dist # 將 dist 目錄的內容部署到 GitHub Pages
