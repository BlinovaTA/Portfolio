<template lang="pug">
  .header-component
    headline
      user
    navigation
</template>

<script>
import headline from "../headline";
import user from "../user";
import navigation from "../navigation";

export default {
  components: {
    headline,
    user,
    navigation,
  }
};
</script>

<style lang="postcss" scoped src="./header.pcss"></style>