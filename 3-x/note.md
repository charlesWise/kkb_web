#### 虚拟DOM实际应用
- 使用js的object来模拟真实的dom，更新之前做diff达到最少操作dom的效果

#### vue中的虚拟dom
- vue1.x响应式，Object.defineProperty每个数据修改，都能通知dom去修改
- vue2.x响应式级别修改了，watcher指到了组件级，组件内部使用虚拟dom

#### vue中虚拟dom做了那些优化
- 1、vue中虚拟dom如何创建
  - template
    - div各种标签和组件
    - 会编译成新建虚拟dom的函数（compile模块，解析成render函数，react中是balber编译成creatElement函数）
- 2、vue中虚拟dom如何diff
  - 新老子元素，都是数组的时候怎么去做优化
    - 预先判定