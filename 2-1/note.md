#### 父组件的created生命周期是早与子组件执行，mounted是子组件先执行；故created是拿不到this.$refs实例。

#### 兄弟组件：通过共同祖辈组件
```
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```

#### 祖先和后代之间，provide/inject能够实现祖先给后代传值，但是反过来想要给祖先传值这种方案不行（在平时开发不建议使用，一般在做一些组件库之类）
```
provide() {
  return {
    dong: this // dong其实就是app这个组件的实例
  }
}

inject: ['dong']
```

#### 事件总线
```
// Bus: 事件派发、监听和回调管理
class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}
// main.js
Vue.prototype.$bus = new Bus();
// child1
this.$bus.$on('foo', handle);
// child2
this.$bus.$emit('foo');
```

#### 作用域插槽
```
// 子组件
<slot name="content" bla="bla~~~~"></slot>
// 父组件
<zizujian>
  <template v-slot:content="{bla}">{{bla}}</template>
</zizujian>
```