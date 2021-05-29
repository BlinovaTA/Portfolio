<template lang="pug">
  card(slim)
    edit-line(
      slot="title"
      v-model="title"
      editModeByDefault
    )
  
</template>

<script>
import card from "../card";
import editLine from "../editLine";

export default {
  components: {
    card,
    editLine
  },
  data() {
    return {
      title: ""   
    }
  }
}
</script>