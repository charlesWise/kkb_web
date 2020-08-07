<template>
  <div>
    <!-- <KInput v-model="model.username" type="password" /> -->
    <!-- v-model一种语法糖相当于 <KInput value="model.username" input="..." /> -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名：" prop="username">
        <KInput v-model="model.username" />
      </KFormItem>
      <KFormItem label="密码：" prop="password">
        <KInput v-model="model.password" type="password" />
      </KFormItem>
      <KFormItem>
        <button @click="onLogin">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KForm from "./KForm.vue";
import KFormItem from "./KFormItem.vue";
import KInput from "./KInput.vue";
export default {
  components: {
    KForm,
    KFormItem,
    KInput,
  },
  data() {
    return {
      model: {
        username: "tom",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名必填",
          },
        ],
        password: [
          {
            required: true,
            message: "密码必填",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          alert("成功！");
        } else {
          alert("失败！");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
