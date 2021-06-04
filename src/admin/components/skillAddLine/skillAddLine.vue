<template lang="pug">
  .skill-add-line-component(:class="{blocked: blocked}")
    .title
      app-input(
        placeholder="Новый навык"
        :errorMessage="titleError"
        v-model="skill.title"
      )
    .percent
      app-input(
        type="number" 
        min="0" 
        max="100" 
        maxlength="3"
        v-model="skill.percent"
      )
    .button
      round-button(
        type="round"
        @click="addSkill"
      )
</template>

<script>
import input from "../input";
import button from "../button";

export default {
  props: {
    blocked: Boolean
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  data() {
    return {
      titleError: "",
      skill: {
        title: "",
        percent: 0
      }
    }
  },
  methods: {
    addSkill() {
      this.titleError = "";
    
      if (this.skill.title.trim() === "") {
        this.titleError = "Заполните поле";

        return;
      }

      if (this.skill.percent === "") {
        this.skill.percent = 0;

        return;
      }

      this.$emit('add-skill', this.skill);
    }
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>