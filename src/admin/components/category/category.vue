<template lang="pug">
  card(slim)
    edit-line(
      slot="title"
      v-model="title"
      editModeByDefault
    )
    ul.skills(slot="content")
      li.item(v-for="skill in skills" :key="skill.id")
        skill(:skill="skill")
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";

const skills = [
  {id: 0, title: "Html", percent: 80},
  {id: 0, title: "Css", percent: 20},
  {id: 0, title: "Javascript", percent: 50},
];

export default {
  components: {
    card,
    editLine,
    skill
  },
  data() {
    return {
      title: "",
      skills
    }
  }
}
</script>