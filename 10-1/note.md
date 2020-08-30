#### webpack 启动流程

- 根据入口来启动配置 获取配置 根据配置信息启动 webpack 执行构建
- 1、从入口模块开始分析
  - 有那些依赖
  - 转换代码
- 2、递归分析其它依赖模块（递归遍历是否含有dependencies）
  - 有那些依赖
  - 转换代码
- 3、生成可以在浏览器端执行的bundle文件
  - 打包完的代码文件名作为key，打包完的代码作为value值
  - value 是一个对象含有dependencies 和 code

```
npm i @babel/parser -D 将code转化成ast
npm i @babel/traverse -D 传入ast 返回我们想要的信息（过滤）
npm i @babel/core @babel/preset-env -D ast转化成code

const { transformFromAst } = require("@babel/core");

```
```
loader的基本结构
module.exports = function(source) {
  return source.replace('kkb', '开课吧')
}
```
```
Plugin
class CopyrightWebpackPlugin() {
  constructor() {}
  // compiler: webpack实例
  apply(compiler) {
    ....
     //  这个里面含有各个webpack钩子
  }
}
```