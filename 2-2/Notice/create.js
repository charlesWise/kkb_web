// 创建指定组件实例并挂载于body上
import Vue from "vue";

export default function create(Component, props) {
  // 1、先创建vue实例
  const vm = new Vue({
    render(h) {
      // render方法提供给我们一个h函数，它可以渲染VNode
      return h(Component, { props });
    },
  }).$mount(); // 更新操作
  // 2、vm创建组件实例
  // 3、通过$children获取该组件实例
  const comp = vm.$children[0];
  // 4、追加至body
  document.body.appendChild(vm.$el);

  // 5、清理函数
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };

  // 6、返回组件实例
  return comp;
}
