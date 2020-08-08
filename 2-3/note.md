```
<div id="box" class="foo"><span>xxx</span></div>
Vue.component('comp', {
  render(h) {
    return h('div', {class: { foo: true }, attrs: {id: 'box}}, [
      h('span', 'xxx')
    ])
  }
})
```

#### vue 插件

```
Myplugin.install = function(Vue, options) {
  // 1、添加全局方法和属性
  Vue.globalMethod = function() {}
  // 2、添加全局指令
  Vue.directive('my-directive', {
    bind(el, binding, vnode, oldVnode) {}
  })
  // 3、注入组件选项
  Vue.mixin({
    created: function() {}
  })
  // 4、添加实例方法
  Vue.prototype.$myMethod = function(options) {}
}

Vue.use(Myplugin);
```

#### 组件混入：mixin

- 混入提供了一种分发 Vue 组件中可复用功能的灵活方式；实质是一个对象，在扩展生命周期、方法等要做的事情。

```
// 定义一个混入对象
var myMixin = {
  created: function() {
    this.hello();
  },
  methods: {
    hello: function() {
      console.log('hello from mixin!');
    }
  }
}

// 定义一个十一号混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})
```
