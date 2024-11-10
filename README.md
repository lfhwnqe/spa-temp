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