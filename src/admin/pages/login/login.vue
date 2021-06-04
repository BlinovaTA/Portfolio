<template lang="pug">
  .login-page-component
    .content
      form.form
        .form-title Авторизация
        .row
          app-input(
            title="Логин"
            icon="user"
          )
        .row
          app-input(
            title="Пароль"
            icon="key"
            type="password"
          )
        .btn
          app-button(title="Отправить")
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";

export default {
  components: {
    appInput,
    appButton
  }  
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>