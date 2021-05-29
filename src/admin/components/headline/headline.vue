<template lang="pug">
  .headline-component
    .container.headline-container
      slot
      .title {{title}}
      .buttons 
        button(type="button").btn Выйти
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "Панель администрирования"
      }
    }
  };
</script>

<style lang="postcss" scoped src="./headline.pcss">
</style>