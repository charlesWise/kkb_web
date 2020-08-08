class Bus {
  constructor() {}
  emit() {}
  on() {}
}
Bus.install = function (Vue) {
  Vue.prototype.$bus = new Bus();
};

export default Bus;

import Bus from "./plugins/bus";
Vue.use(Bus);
