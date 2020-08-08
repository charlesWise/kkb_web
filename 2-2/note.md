分析一下需要完成的任务：
- 1、要能解析routes配置，变成一个key为path，value为component的map
- 2、要能监控url变化事件，把最新的hash值保存到current路由
- 3、要定义两个全局组件：router-view用于显示匹配组件内容，router-link用于修改hash
- 4、current应该是响应式的，这样可以触发router-view的重新渲染