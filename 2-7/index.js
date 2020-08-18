import Icon from '@/components/Icon.vue';

// 利用webpack的require.context自动导入
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)

Vue.component('Icon', Icon); // 全局注册组件