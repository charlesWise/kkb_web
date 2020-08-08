<template>
  <div>
    <!-- 自定义组件要实现v-model必须实现:value,@input -->
    <!-- <input type="text" :value="value" @input="onInput" /> -->
    <!-- v-bind="$attrs" 存储的是props之外的部分，v-bind语法糖相当于把父组件的type="text" type="password" 给展开了 -->
    <input v-bind="$attrs" :value="value" @input="onInput" />
  </div>
</template>

<script>
import emitter from '../mixins/emitter';

export default {
  inheritAttrs: false, // 为了防止外层div容器继承type="text"之类属性
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  mixins: ['emitter'],
  methods: {
    onInput(e) {
      // 通知父组件数值变化
      this.$emit("input", e.target.value);

      // 通知FormItem校验
      // https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js
      // https://github.com/ElemeFE/element/blob/dev/packages/input/src/input.vue
      // this.$parent.$emit("validate");

      this.dispatch("validate"); // 派发事件
    },
  },
};
</script>

<style lang="scss" scoped></style>
