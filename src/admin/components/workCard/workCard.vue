<template lang="pug">
  card(simple)
    .works-wrapper
      .work__pic
        img.work__image(:src="cover")
        .work__tag
          tags-list(:tags="work.techs")
      .work__data
        .work__title {{work.title}}
        .work__text
          p {{work.description}}
        a.work__link(:href="work.link") {{work.link}}
        .work__btns
          icon(symbol="pencil" title="Править")
          icon(symbol="trash" title="Удалить")
</template>

<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";

export default {
  components: { 
    card, 
    icon, 
    tagsList 
  },
  props: {
    work: Object
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`;
    }
  }
}
</script>

<style lang="postcss" scoped src="./workCard.pcss"></style>