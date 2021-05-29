<template lang="pug">
  card(slim)
    edit-line(
      slot="title"
      v-model="title"
      editModeByDefault
    )
    ul.skills(slot="content")
      li.item
        skill
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";

export default {
  components: {
    card,
    editLine,
    skill
  },
  data() {
    return {
      title: ""   
    }
  }
}
</script>