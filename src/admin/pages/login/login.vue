<template lang="pug">
  .login-page-component
    .content
      form.form(@submit.prevent="handleSubmit")
        .form-title Авторизация
        .row
          app-input(
            title="Логин"
            icon="user"
            v-model="user.name"
            :errorMessage="validation.firstError('user.name')"
          )
        .row
          app-input(
            title="Пароль"
            icon="key"
            type="password"
            v-model="user.password"
            :errorMessage="validation.firstError('user.password')"
          )
        .btn
          app-button(
            title="Отправить"
            :disabled="isSubmitDisabled"
          )
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import axios from "axios";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": value => Validator.value(value).required("Введите имя пользователя"),
    "user.password": value => Validator.value(value).required("Введите пароль")
  },
  components: {
    appInput,
    appButton
  },
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      isSubmitDisabled: false
    };
  },
  methods: {
    handleSubmit() {
      this.$validate().then(isValid => {
        if (!isValid) return;

        this.isSubmitDisabled = true;

        axios
          .post("https://webdev-api.loftschool.com/login", this.user)
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers["Authorization"] = `Bearer ${token}`;
            this.$router.replace("/");
          })
          .catch((error) => console.log(error.response.data.error))
          .finally(() => (this.isSubmitDisabled = false));
      });
    },
  },
};
</script>

<style lang="postcss" scoped src="./login.pcss"></style>