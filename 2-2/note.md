分析一下需要完成的任务：

- 1、要能解析 routes 配置，变成一个 key 为 path，value 为 component 的 map
- 2、要能监控 url 变化事件，把最新的 hash 值保存到 current 路由
- 3、要定义两个全局组件：router-view 用于显示匹配组件内容，router-link 用于修改 hash
- 4、current 应该是响应式的，这样可以触发 router-view 的重新渲染
