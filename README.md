# React demo start

> Quick, simple, easy

## How to Start

```bash
npm i
npm start
```

open [http://localhost:9998/](http://localhost:9998/)

Done!

## Webpack

>  webpack 配置是标准的 Node.js CommonJS 模块

所以，可以
- 通过 require(...) 导入其他文件
- 通过 require(...) 使用 npm 的工具函数
- 使用 JavaScript 控制流表达式，例如 ?: 操作符
- 对常用值使用常量或变量
- 编写并执行函数来生成部分配置

### 入口(entry)

#### 单入口

```js
  entry: {
    main: './path/to/my/entry/file.js'
  }
// 简写
  entry: './path/to/my/entry/file.js'
  // 传入一个数组，将创建“多个主入口(multi-main entry)”。在你想要多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。
```

#### 多入口

> 用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 webpack-merge）将它们合并。

```js
  // 分离 应用程序(app) 和 第三方库(vendor) 入口
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }

  // 多页面应用
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
  // 使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。
```


### 输出(output)

- filename 用于输出文件的文件名。
- 目标输出目录 path 的绝对路径。

#### 单入口起点

```js
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
```

#### 多个入口起点

```js
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
  // 如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符(substitutions)来确保每个文件具有唯一的名称。
```

### loader

> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）

- test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
- use 属性，表示进行转换时，应该使用哪个 loader。

#### 配置

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }

  // webpack配置loader时是可以不写loader的后缀明-loader，因此css-loader可以写为css
  // css-loader用于解析，而style-loader则将解析后的样式嵌入js代码
  // 将require引入的样式嵌入js文件中，有好处也有坏处。好处是减少了请求数，坏处也很明显，就是当你的样式文件很大时，造成编译的js文件也很大。 我们可以使用插件的方式，将样式抽取成独立的文件。使用的插件就是extract-text-webpack-plugin
```


#### 内联

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
// 通过前置所有规则及使用 !，可以对应覆盖到配置中的任意 loader。 选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。
```

#### 特性

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。 
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 options 对象进行配置。
除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 - package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。


### 插件(plugins)

> 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
```



### 模式(mode)

> 通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化

### webpack 模块

- ES2015 import 语句 (webpack2+默认支持)
- CommonJS require() 语句 (默认支持)
- AMD define 和 require 语句
  + babel loader
  + ts loader
  + ...
- css/sass/less 文件中的 @import 语句。  
  + Sass loader
  + Less loader
  + Stylus loader


### 模块解析

> resolver 是一个库(library)，用于帮助找到模块的绝对路径。一个模块可以作为另一个模块的依赖模块，然后被后者引用


### [manifest](https://doc.webpack-china.org/concepts/manifest/)

### [模块热替换](https://doc.webpack-china.org/concepts/hot-module-replacement/)


## webpack-dev-server