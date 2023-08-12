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
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html', './pages/**/*.yml' ]),
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


// "deploy": "vite build && gh-pages -d dist -b pages -r github",
// https://github.com/new
// https://github.com/new?repository_name=your_repo_name&description=your_description&private=true&auto_init=true&gitignore_template=template_name&license_template=template_name
// &team_id=your_team_id&parent_repo=parent_repo_name
// https://github.com/new?repository_name=A.py&auto_init=true
// &gitignore_template=python
// private=true 私有專案
// auto_init=true  README 文件



// "gitlab-pages": "^0.3.0",