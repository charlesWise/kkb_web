- runtime：仅包含运行时的版本，包含 vue 运行核心代码但没有模板编译器，如：vue.runtime.js
- umd：用于浏览器 script 便签，默认包含运行时和编译器，如 vue.js
- comminjs：cjs 规范用于旧版本打包器，如 browserify、webpack1，如 vue.runtime.common.js
- esm：ES module 规范用于现代打包器如 webpack2 及以上版本，如 vue.runtime.esm.js

- --sourcemap

#### 整体启动顺序：

src/platforms/web/entry-runtime-with-compiler.js

- 扩展 mount 方法

src/platforms/web/runtime/index.js

- ** patch ** 打补丁，真实但 DOM 操作，Vnode 怎么变成真实 dom
- mountComponent ? diff 算法 虚拟 dom

src/core/index.js

- 全局 api 初始化：initGlobalAPI(Vue) - use set delete mixin extend

src/core/instance/index.js

- 构造函数：
- initMixin
  - initLifecycle $parent $children
  - initRender vm.\$createElement
  - initState 初始化 props methods data computed watch 等
- stateMixin
  - 实现 $watch $set \$detele
- eventMixin
  - $on $emit
- lifecycleMixin
  - update forceUpdate
- renderMixin

  - render nextTick

- \*子组件创建时，父组件已创建

#### 数据响应式

- vue1.x：在我们但模版中每次只要出行一个动态但数值我们都会创建一个 watcher，界面中的每一个双大括号的绑定都有一个 watcher，然后这些 watcher 都会加入 dep 中，以前 vue 做不了大项目只要一做就会卡，就是因为界面出行太多的绑定我们就会创建太多的 watcher 这些就会占用太多的资源就会卡顿。
- vue2.x+：学习了 react 加入了虚拟 DOM，并且每一个组件会挂载一个 watcher，如果一个界面的任何一个 data 发生变化，我们都会尝试通知那个 watcher，但是大家想一想这个 watcher 知不知道是谁变了，其实不知道，因为对于 watcher 只知道是那个组件和它相关联，那如果这个时候别人让他更新的时候它怎么做？它唯一能做的是把虚拟 DOM 拿出来 diff 对比哪些发生变化了然后把变化的值变成 DOM 操作去执行，只就是 vue 引入虚拟 DOM 的原因。

initData: src/core/state.js

- proxy() 代理到 vm
- observe(data, xx)

observe: src/core/observe/index.js

- ob = new Observer(value)
- 里面有 dep
- protoAugment
- walk 不是数组 》defineReactive 》递归响应式处理

```
get
  if(Dep.target) {
    // 加入到dep管理watcher
    dep.depend()
    child.dep.depend()
    if (数组) {....}
  }
set
  dep.notify()

  depend() {
    // Dep.target及watcher，dep加入watcher
    // 目的是想在watcher和dep之间做一个相互的引用，希望将来当前的dep对象它可以保留所有的watcher，同时也知道每一个watcher哪些dep在管理它，目的主要是解决多对多的关系，因为它任务一个watcher可能存在多个dep，例如一个值在两个组件都出现了，那么这个时候watcher就是交叉的引用关系。
    if (Dep.target) {
      Dep.target.addDep(this)
    }

    watcher：
    addDep() {
      ...
      dep.addSub(this)
    }
    // 在一个组件里面watcher有好多个，其中一定有一个是渲染watcher是一个一对一的关系。
    // 还有些情况在组件里面会创建多个watcher，如在一个组件里面些了几个watch选项，在watch里面是不是有多个表达是watch，又或者你调$watch函数主动得到一些东西。可能有一个dep管理了另外两个watcher，但可能其中但一个watcher都被另外两个dep都管理了，比如一个组件一个watcher，这个watcher可能关联着其中某个data值，这个时候就和这个dep相关联，如果这个watcher和另外一个值也有关系，那是不是这个watcher又和另外一个dep关联，那就是说我这个watcher可能和好多的dep有关系，这就是多对多的关系这个时候就是我们要相互引用。
  }
```

- watcher.js
  - 批量处理：更新的时候不是每次都去更新是怎么做到的？异步队列，queueWatcher（涉及到宏、微任务）
  - watcher run update
- nextTick
  - Promise > mutationObserver > setImmediate > setTimeout
- 怎么做到数据更新的批量处理，怎么做到的？从而可以将来减少浏览器的刷新次数，答案就在这个队列中，平常的更新不是立马就去更新，而且放到一个异步队列更新，通过 nexttick 函数去执行队列
- 数组 7 个变异方法，拦截数组改变方法，做了额外的数据更新 ob.dep.notify()，一个对象数组里面每一项，都执行了 observeArray 响应式了，所以改变数组的某一项值会更新
