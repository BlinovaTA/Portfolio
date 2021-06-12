<template lang="pug">
  card
    template(#title)
      .review__header
        avatar(size="2.7" :src="cover").review__avatar
        .review__header-info
          .review__author {{review.author}}
          .review__position {{review.occ }}
    template(#content)
      .review__content
        .review__text {{review.text}}
      .review__actions
        icon(
          title="Править" 
          symbol="pencil"
          @click="editClick"
        ).review__edit
        icon(
          title="Удалить" 
          symbol="cross"
          @click="removeClick"
        ).review__cross
</template>

<script>
import card from "../../components/card";
import avatar from "../../components/avatar";
import icon from "../../components/icon";

export default {
  props: {
    review: {
      type: Object,
      default: () => ({
        author: "",
        occ: "",
        text: "",
        photo: {}
      })
    }
  },
  components: {
    card,
    avatar,
    icon
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`;
    }
  },
  methods: {
    removeClick() {
      this.$emit("remove");
    },
    editClick() {
      this.$emit("edit");
    }
  }
}
</script>

<style lang="postcss" scoped src="./reviewCard.pcss"></style>