<template lang="pug">
  .skill-component(v-if="!editmode")
    .title {{skill.title}}
    .percent {{skill.percent}}
    .buttons
      icon.btn(
        symbol="pencil"
        grayscale
        @click="editmode=true"
      )
      icon.btn(
        symbol="trash"
        grayscale
        @click="$emit('remove', currentSkill)"
      )

  .skill-component(v-else)
    .title
      app-input(
        noSidePaddings
        v-model="currentSkill.title"
        :errorMessage="titleError"
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
      icon.btn(
        symbol="tick"
        @click="approveSkill"
      )
      icon.btn(
        symbol="cross"
        @click="closeEditMode"
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
        percent: this.skill.percent,
        category: this.skill.category
      },
      titleError: ""
    }
  },
  methods: {
    approveSkill() {
      this.titleError = "";

      if (this.currentSkill.percent === "") {
        this.currentSkill.percent = 0;

        return;
      }

      if (this.currentSkill.title.trim() === "") {
        this.titleError = "Заполните поле";
        
        return;
      }

      this.$emit('approve', this.currentSkill);
    },
    closeEditMode() {
      this.titleError = "";
      this.editmode = false;
      this.currentSkill = {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent
      }
    }
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>