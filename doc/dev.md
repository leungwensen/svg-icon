svg-icon开发文档
====================

## gulp

gulp作为项目构建脚本入口，包含开发／测试／代码风格检测／构建／发布／上传CDN等管理前端项目周期的脚本。

### dev

会启动`webpack-dev-server`。包含开发／测试和demo的静态页面，会watch文件变更，自动构建。

```shell
gulp dev
```

### eslint

代码风格检测，配置文件见[../.eslintrc](../.eslintrc)

```shell
gulp eslint
```

### jsdoc

使用jsdoc3从代码中提取文档。配置见[./config.js](./config.js)

```shell
gulp jsdoc
```

### pack

使用`webpack`构建项目。配置文档见[../webpack.config.js](../webpack.config.js)

```shell
gulp pack
```

### babel

把`src/*.js`降级为es5，放到根目录上。慎用。

### amd2commonjs / cmd2commonjs / commonjs2es6 等

源码转换脚本，所有操作在temp文件夹下进行（辅助项目迁移用，并不会加入版本控制）

### upload(TODO)

## webpack

webpack负责对源码进行实时编译（`webpack-dev-server`），编译打包（包括js、css、图片字体等）。

### entry

如果需要添加新的`src`入口文件（默认是`src/index.js`），或者测试入口文件（默认是`spec/index.spec.js`），或者demo入口文件（默认是`demo/index.spec.js`），需要在`webpack.config.js`中注册entry

### output

webpack打包后的js文件是es5格式，并且会暴露一个全局变量（默认为`svgIcon`）

### loaders

#### babel

负责把es6代码编译成es5。

#### style-loader等

样式、静态资源相关

#### template2module-loader和template-importing-loader

处理模版文件，使得可以在代码中使用`const tpl = require('some/template.tpl');`语法引入模版（loader将负责把.tpl文件的html转换成一个js模块）。

`template2module-loader`背后采用的是[leungwensen/template2module](https://github.com/leungwensen/template2module)包进行模版转译，目前支持animajs/template，doT，underscore，microtemplating，nano，zero等模版引擎。并且理论上可以通过自定义引擎组件支持任意语法。

`template-importing-loader`则是在此基础上，为模版文件加入`<import src="../other/template.tpl"></import>`语法，使得模版具备依赖注入功能。

#### svg-icon(TODO)

