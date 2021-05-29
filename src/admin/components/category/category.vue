<template lang="pug">
  card(slim)
    edit-line(
      slot="title"
      v-model="categoryTitle"
      :editModeByDefault="empty"
      @remove="$emit('remove', $event)"
    )
    template(slot="content")
      ul.skills(v-if="empty === false")
        li.item(v-for="skill in skills" :key="skill.id")
          skill(:skill="skill")
      .bottom-line
        skillAddLine(:blocked="empty")
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";

export default {
  components: {
    card,
    editLine,
    skill,
    skillAddLine
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categoryTitle: this.title
    }
  }
}
</script>

<style lang="postcss" scoped src="./category.pcss"></style>