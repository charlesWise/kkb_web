- vue inspect (--rules) (svg)

```
chainWebpack(config) {
  config.module.rule('svg)
    .exclude.add(resolve('src/icons'));
  // 添加svg-sprite-loader
  config.module.rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end() // add完上下文进入数组，使用end回退
    .use('svg-sprite-loader') // 添加loader
    .loader('svg-sprite-loader') // 切换上下文到loader
    .options({ symbolId: 'icon-[name]' })
    .end()
}
```
