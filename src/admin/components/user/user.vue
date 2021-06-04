<template lang="pug">
  .user-component
    avatar(
      size="2.7"
      :src="userPic"
    )
    .username Татьяна Блинова
</template>

<script>
import avatar from '../avatar';

export default {
  components: {
    avatar
  },
  computed: {
    userPic() {
      return require("../../../images/content/tatiana.jpg").default;
    }
  }  
}
</script>

<style lang="postcss" scoped src="./user.pcss"></style>