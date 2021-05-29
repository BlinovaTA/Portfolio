<template lang="pug">
  .skill-component(v-if="!editmode")
    .title Git
    .percent 80%
    .buttons
      icon(
        symbol="pencil"
        class="btn"
        grayscale
      )
      icon(
        symbol="trash"
        class="btn"
        grayscale
      )

  .skill-component(v-else)
    .title
      app-input(noSidePaddings)
    .percent
      app-input(
        type="number"
        min="0"
        max="100"
        maxlength="3"
      )
    .buttons
      icon(
        symbol="tick"
        class="btn"
      )
      icon(
        symbol="cross"
        class="btn"
      )
</template>

<script>
import input from "../input";
import icon from "../icon";

export default {
  components: {
    appInput: input,
    icon  
  },
  data() {
    return {
      editmode: false
    }
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>