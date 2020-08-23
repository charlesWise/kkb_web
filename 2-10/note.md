#### 新增 ts 支持 vue add @vue/typescript

#### interface 接口只需要声明结构，不需要实现

#### 泛型

```
interface Result<T> {
  ok: 0 | 1;
  data: T[]
}
function getData<T>(): Promise<Result<T>> {
  const data: any[] = [
    { id: 1, name: 'leixing'},
    { id: 2, name: 'fanxing'},
  ]
  return Promise.resolve<Result<T>>({ok: 1, data})
  return new Promise(resolve => resolve({ok: 1, data}))
}

export default class Hello extends Vue {
  constructor() {
    this.features = getData<Feature>().data;
  }
}
```

#### 装饰器：用于扩展类或者它的属性和方法

- 其实可以理解成就是一个工厂函数，对修下东西给自动传进去化妆一下。类似一种高阶组件、函数。

```
// !: 断言，明确赋值断言意味着将来一定会给赋值。
@Prop({type: String, default: '})
private msg!: string
```

```
子组件里面：
// 不给Emit传参，表示事件名称是方法名（addFeature）
@Emit()
private addFeature(event: any) {
  this.features.push(event.target.value);
  // 如果没有返回值，则拿形参（event）作为事件参数，否则返回值是
  return {xxx: xx}
}

父组件里面：
<hello @addFeature="dosomething" />
export default calss App extends Vue {
  private: dosomething() {
    todo..
  }
}
```

```
@Watch('features', { deep: true })
private msgChange(newVal, oldVal) {
  todo..
}
```

#### 装饰器原理

- 修饰类声明、方法、访问符（get）、属性、参数，最终是个函数
- 类（target）（原型或者构造函数）
- 方法（target, name, descriptor）（原型或者构造函数，方法名，属性描述）
