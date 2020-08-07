<template>
  <div>
    <button @click="onClick">点击</button>
  </div>
</template>

<script>
import create from "./create";
import Notice from "./Notice.vue";

export default {
  methods: {
    onClick() {
      // 创建弹窗实例
      const notice = create(Notice, {
        title: "xxx",
        message: "blabla!!!",
        duration: 2000,
      });
      notice.show();
    },
  },
};
</script>

<style lang="scss" scoped></style>
