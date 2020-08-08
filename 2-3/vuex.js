/**
 * 1、维护状态
 * 2、修改状态commit
 * 3、业务逻辑控制dispatch
 * 4、状态派发getter
 * 5、实现state响应式
 */
let Vue;
function install(_Vue, storeName = "$store") {
  Vue = _Vue;

  // 混入：把store选项指定到Vue原型上
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype[storeName] = this.$options.store;
      }
    },
  });
}

class Store {
  constructor(options = {}) {
    // 利用vue数据响应式
    this.state = new Vue({
      data: options.state,
    });
    this.mutations = options.mutations || {};
    this.actions = options.actions || {};

    options.getters && this.handleGettets(options.getters)
  }

  // 触发mutations，需要实现commit
  commit = (type, ...arg) => {
    // this指向Store实例
    const fn = this.mutations[type];
    fn(this.state, arg);
  };

  dispatch = (type, ...arg) => {
    const fn = this.actions[type];
    return fn({ commit: this.commit, state: this.state }, arg);
  };
  // {getters: {score(state) {return state.xxx}}}
  handleGettets(getters) {
    this.getters = {};

    // 定义只读属性
    Object.keys(getters).forEach(k => {
      Object.defineProperty(this.getters, k, {
        get: () => {
          return getters[k](this.state)
        }
      })
    })
  }
}

export default { Store, install };
