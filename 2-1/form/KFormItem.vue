<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Validator from "async-validator";

export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: String,
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  mounted() {
    // 监听校验事件、并执行监听
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 执行组件校验
      // 1、获取校验规则
      const rule = this.form.rules[this.prop];
      // 2、获取数据
      const value = this.form.model[this.prop];
      // 执行校验 需要async-validator npm i async-validator -S
      const desc = {
        [this.prop]: rule,
      };
      const valid = new Validator(desc);
      // 返回的Promise<boolean>
      return valid.validate({ [this.prop]: vaule }, (errors) => {
        if (errors) {
          this.errorMessage = errors[0].message;
        } else {
          this.errorMessage = "";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
