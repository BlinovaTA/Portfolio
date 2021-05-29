<template lang="pug">
  card(slim)
    edit-line(
      slot="title"
      v-model="title"
      :editModeByDefault="empty"
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

const skills = [
  {id: 0, title: "Html", percent: 80},
  {id: 0, title: "Css", percent: 20},
  {id: 0, title: "Javascript", percent: 50},
];

export default {
  components: {
    card,
    editLine,
    skill,
    skillAddLine
  },
  props: {
    empty: Boolean
  },
  data() {
    return {
      title: "",
      skills
    }
  }
}
</script>

<style lang="postcss" scoped src="./category.pcss"></style>