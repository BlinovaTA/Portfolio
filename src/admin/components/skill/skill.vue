<template lang="pug">
  .skill-component(v-if="!editmode")
    .title {{skill.title}}
    .percent {{skill.percent}}
    .buttons
      icon(
        symbol="pencil"
        class="btn"
        grayscale
        @click="editmode=true"
      )
      icon(
        symbol="trash"
        class="btn"
        grayscale
        @click="$emit('remove', skill.id)"
      )

  .skill-component(v-else)
    .title
      app-input(
        noSidePaddings
        v-model="currentSkill.title"
      )
    .percent
      app-input(
        type="number"
        min="0"
        max="100"
        maxlength="3"
        v-model="currentSkill.percent"
      )
    .buttons
      icon(
        symbol="tick"
        class="btn"
        @click="$emit('approve', currentSkill)"
      )
      icon(
        symbol="cross"
        class="btn"
        @click="editmode=false"
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
  props: {
    skill: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
      editmode: false,
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent
      }
    }
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>