# spa-temp 前端架构指南

## 结构
├── .env
├── .eslintignore
├── .eslintrc
├── .git
│   ├── COMMIT_EDITMSG
│   ├── FETCH_HEAD
│   ├── HEAD
│   ├── config
│   ├── description
│   ├── hooks
│   ├── index
│   ├── info
│   ├── logs
│   ├── objects
│   ├── packed-refs
│   └── refs
├── .gitignore
├── .npmrc
├── .swcrc
├── README.md
├── config
│   ├── webpack.development.js
│   └── webpack.production.js
├── dist
│   ├── index.html
│   └── main.js
├── docs
├── package.json
├── postcss.config.json
├── prettier.config.js
├── public
├── scripts
├── src
│   ├── abi
│   ├── components
│   ├── connections
│   ├── hooks
│   ├── index.css
│   ├── index.html
│   ├── index.tsx
│   ├── pages
│   ├── states
│   └── style.css
├── tailwind.config.js
├── test
│   ├── e2e
│   └── unit
├── tsconfig.json
├── webpack.config.js
└── yarn.lock

# todo
- 单元测试
- e2e
- ui测试
# webpack
### swc
> 为什么使用swc而不是esbuild

Esbuild 和 SWC 在与 webpack 集成时重要区别，module prepack 区别。主要的区别在于它们会影响到 webpack 的 ModulePrepack 优化过程。
主要差异点在于：

Webpack 的 ModulePrepack 优化：


能够在编译时进行静态分析
可以进行常量折叠（constant folding）
可以执行死代码消除（dead code elimination）
能评估和优化模块依赖关系


Esbuild 的问题：


Esbuild 由于其快速的转译特性，会提前将代码转换为较低级别的形式
这种转换会破坏 webpack 的 ModulePrepack 所需的某些代码结构
导致 webpack 无法进行某些静态分析和优化


SWC 的处理：


SWC 保留了更多的原始代码结构
允许 webpack 的 ModulePrepack 正常工作
能更好地配合 webpack 的优化流程

### mini-css-extract-plugin
mini-css-extract-plugin 主要解决了在 webpack 构建过程中 CSS 文件的处理问题
- CSS 提取
    - 默认情况下，webpack 会将 CSS 打包到 JS 文件中
    - mini-css-extract-plugin 可以将 CSS 提取到单独的文件中，而不是打包在 JS 里
- 性能优化
    - 减少了 JS 文件体积
    - 允许浏览器并行加载 JS 和 CSS，提高页面加载速度
    - 支持 CSS **文件的缓存机制**

# UI测试
使用backstopjs实现ui测试

初始化
```shell
npx backstop init 
```

配置 backstop.json

测试页面配置
```json
"scenarios": [
    {
      //测试标签，对应需要测试的页面
      "label": "firstPage",
      // cookie地址
      "cookiePath": "backstop_data/engine_scripts/cookies.json",  
      // 测试地址
      "url": "https://garris.github.io/BackstopJS/",  
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true
    }
  ],
```

设计稿原图配置
```json
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report",
    "referenceUrl": "https://your-domain.com/reference-images/"  // 对应远程图片源
  }
```

测试设计稿地址：backstop_data/bitmaps_reference