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
import $axios from "../../requests";
import { mapActions } from 'vuex';

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
    ...mapActions({
      showTooltip: "tooltips/show",
      login: "user/login"
    }),
    async handleSubmit() {
      if (!(await this.$validate())) {
        return;
      }

      this.isSubmitDisabled = true;

      try {
        const response = await $axios.post("/login", this.user);

        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        const userResponse = await $axios.get("/user");
        this.login(userResponse.data.user);

        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error"
        })
      } finally {
        this.isSubmitDisabled = false
      }
    },
  },
};
</script>

<style lang="postcss" scoped src="./login.pcss"></style>