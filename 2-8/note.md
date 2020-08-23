```
if (permissionRoles && permissionRoles instanceof Array && permissionRoles.length) {
  const hasPermission = roles.some(role => {
    return permissionRoles.includes(role)
  })
}
```

#### 测试

- Mocha + Chai 或者 Jest
- describe 测试套件
- it 测试用例
- expect 断言

#### 项目学习
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)