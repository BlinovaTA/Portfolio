<template lang="pug">
  .app-container
    headline
      user
    navigation
    .page-content
      .container
        .header
          .title Блок "Обо мне"
          iconed-button(
            type="iconed" 
            title="Добавить группу"
          )
        ul.skills
          li.item
            category
          li.item
            category
          li.item
            category
</template>

<script>
import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";
import button from "./components/button";
import category from "./components/category";

export default {
  components: {
    headline,
    user,
    navigation,
    iconedButton: button,
    category
  },
}
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
