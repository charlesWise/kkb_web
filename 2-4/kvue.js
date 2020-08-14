// 定义KVue构造函数
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options;
    // 传入data
    this.$data = options.data;
    // 响应式处理
    this.observe(this.$data);
  }

  observe(value) {
    if (!value || typeof value !== "object") return;
    // 遍历value
    Object.keys(value).forEach((key) => {
      // 响应式处理
      this.defineReactive(value, key, value[key]);
      // 代理data中的属性到vue根上
      this.proxyData(key);
    });
  }

  defineReactive(obj, key, val) {
    // 递归遍历
    this.observe(val);
    // 定义一个Dep，每个dep实例和data中每个key有一对一关系，dep和watcher之间是一对多的关系
    const dep = new Dep();
    // 给obj的每一个key定义拦截
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newval) {
        // 这里val采用一种闭包的形式，并不是obj[key] = newval，而是val = newval赋值
        if (newval !== val) {
          val = newval;
          dep.notify();
        }
      },
    });
  }

  proxyData(key) {
    // this指到KVue实例
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      },
    });
  }
}

// 创建Dep：管理所有Watcher
class Dep {
  constructor() {
    this.watchers = [];
  }
  addDep(watcher) {
    this.watchers.push(watcher);
  }
  notify() {
    this.watchers.forEach((watcher) => watcher.update());
  }
}

// 创建Watcher：保存data中数据和页面中挂钩关系
class Watcher {
  constructor(vm, key) {
    this.vm = vm;
    this.key = key;

    // 创建实例时立刻将该实例指向Dep.target便于依赖收集
    Dep.target = this;
    this.vm[this.key]; //触发依赖收集
    Dep.target = null;
  }

  update() {
    console.log(this.key + "更新了");
  }
}
