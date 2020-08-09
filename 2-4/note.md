```
在vue根上定义属性代理data中的数据
proxyData(key) {
  Object.defineProperty(this, key, {
    get() {
      return this.$data[key];
    },
    set(newVal) {
      this.$data[key] = newVal;
    }
  })
}
```

- 每个 dep 实例和 data 中每个 key 有一对一关系，dep 和 watcher 之间是一对多的关系
- getter 依赖收集，看 Dep.target && dep.addDep(Dep.target);
