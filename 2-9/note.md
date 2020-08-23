#### [nuxt.js](https://zh.nuxtjs.org/)

#### asyncData
- 1、前后端都会执行，时间点在beforeCreate之前
- 2、传递一个上下文对象
- 3、会和data合并
- 4、里面不能使用this
```
asyncData({ $axios, error ... }) {
  try {
  } catch (error) {
  }
}
```
#### 中间件
- 中间件会在一个页面或一组页面渲染之前运行我们定义的函数，常用于权限控制、校验等任务。

#### 插件
- 只会执行一次