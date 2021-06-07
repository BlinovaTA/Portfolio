<template lang="pug">
  .skill-add-line-component(:class="{blocked: blocked}")
    .title
      app-input(
        placeholder="Новый навык"
        v-model="skill.title"
        :errorMessage="validation.firstError('skill.title')"
      )
    .percent
      app-input(
        type="number" 
        min="0" 
        max="100" 
        maxlength="3"
        v-model="skill.percent"
        :errorMessage="validation.firstError('skill.percent')"
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
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "skill.percent": value => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Некорректное значение")
        .required("Не может быть пустым")
    }
  },
  props: {
    blocked: Boolean
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  data() {
    return {
      skill: {
        title: "",
        percent: 0
      }
    }
  },
  methods: {
    async addSkill() {
      if (!(await this.$validate())) return;

      this.$emit('add-skill', this.skill);
    }
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>