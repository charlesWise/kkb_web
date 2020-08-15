#### 虚拟 DOM（Virtual DOM）

- 是对 DOM 的 JS 抽象表示，是 JS 对象能够描述 DOM 结构和关系，应用各种状态变化作用于虚拟 DOM 最终映射到 DOM 上。

- vue1.x 中有细粒度的数据变化侦测，每一个{{xx}}执行的都会对应的创建一个 watcher，一旦 xx 发生变化和 xx 相关的 dep 会通知所以相关界面中 xx 去更新，所以它是不需要虚拟 DOM 的，但是造成大量开销，大型项目中不可接受。而 vue2.x 选择了中等粒度的解决方案，每个组件一个 watcher 实例，这样状态变化是只通知组件在通过引入虚拟 DOM 去进行比对和渲染。

- render 用来返回 vnode
  - platforms/web/runtime/index.js \$mount 方法应用程序的挂载点，mountComponent 方法
  - core/instance/lifecycle.js 定义了更新组件的方法 updateComponent。

#### 整体流程分析

- updateComponent 函数里面执行 vm.\_update(vm.\_render(), hydrating) 首先执行 vm.\_render()返回一个 vnode（createElement 函数执行返回 vnode），把 vnode 作为参数执行\_update 做真正的 dom 更新。
- updateComponent 函数谁在调用？new Watcher(vm, updateComponent ...)创建一个组件相关的 watcher 实例，如果用户写了\$watcher/Watcher 选项就会额外创建 watcher
- 然后我们看下 watcher 的构造函数做了那些事？把当前所有的 watcher 存储数组里面，根据用户传进来的是 function 还是 string 做判断，如果是 function 就说明是 render watcher，就会把保存起来最后执行一下里面的 get 函数，get 函数就会去调用上面赋值的 getter 函数。既然这个 watcher 是和组件相关的，那么将来组件里面的任何一个 data 属性发生变化的时候，dep 都会去通知 watcher 然后这个时候 dep 通知的 watcher 都是一个（一个组件一个 watcher），然后这些 watcher 进来的时候都会执行我们的 get 函数，这个 getter 函数会被调用，其实这个 getter 函数就是我们刚才传进来的组件更新 updateComponent 函数，这样我们就串起来了只要一变化就会去 update 更新。

#### **patch**

- \_update() 如果没有老的 vnode，说明是初始化；更新周期直接 diff，返回新 dom **patch**方法

  - **patch**扩展操作，把通用模块和浏览器中持有模块合并；工厂函数：创建浏览器特有的 patch 函数，只要解决跨平台问题，这个 patch 拥有的能力就是一个是 node-ops.js 对浏览器的 dom 操作；一个 modules.js 所有的属性操作。

- core/vdom/patch.js createPatchFunction

- vue 使用的 patching 算法基于 Snabbdom
- patch 将新老 vnode 节点进行比对（diff 算法），然后根据比较结果进行最小量 DOM 操作，而不是将整个视图根据新 vnode 重绘。
- 那么 patch 是如何工作的呢？首先说核心 diff 算法：通过**同层的树节点进行比较**而非对树进行逐层搜索遍历的方式，所以时间复杂度只有 O(n)，是一直相当高效的算法。
- 同层级制作三件事：**增删改**。具体规则是：**new VNode 不存在就删；old VNode 不存在就增；都存在就比较类型，类型不同直接替换、类型相同执行更新。**

- **patchVnode**
  - 两个vnode类型相同就执行更新操作，包括三种类型操作：**属性更新props、文本更新Text、子节点更新Reorder**
  - patchVnode具体规则如下：
  - 1、如果新旧vnode都想静态的，同时它们都想key相同（代表同一节点），并且新的vnode是clone或者是标记了v-once，那么只需要替换elm以及componentInstance即可；
  - 2、新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff核心。
  - 3、如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。
  - 4、当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。
  - 5、当新老节点都无子节点的时候，至少文本的替换。

- **updateChildren**主要作用是用一种较高效的方式比对新旧两个vnode的children得出最小操作补丁。执行一个双循环是传统方式，vue中针对web场景特点做了特别的算法优化。在新老两组vnode节点的左右头尾两侧都有一个变量标记，在**遍历过程中这几个变量都会向中间靠拢**。当oldStartIndx > oldEndIdx或者newStartIdx > newEndIdx时结束循环。

- 细节diff：todo...

- 头和头比对相同，游标++；尾和尾比对相同，游标--；老头和新尾相同，新游标--老++；老尾和新头相同，新游标++老--；挨个比对相同。游标让双循环进行的一种优化策略。