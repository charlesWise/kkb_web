<template>
  <div>
    <!-- 自定义组件要实现v-model必须实现:value,@input -->
    <!-- <input type="text" :value="value" @input="onInput" /> -->
    <!-- v-bind="$attrs" 存储的是props之外的部分，v-bind语法糖相当于把父组件的type="text" type="password" 给展开了 -->
    <input v-bind="$attrs" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // 为了防止外层div容器继承type="text"之类属性
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInput(e) {
      // 通知父组件数值变化
      this.$emit("input", e.target.value);

      // 通知FormItem校验
      this.$parent.$emit("validate");
    },
  },
};
</script>

<style lang="scss" scoped></style>
