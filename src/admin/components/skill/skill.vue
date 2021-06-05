<template lang="pug">
  .skill-component(v-if="!currentSkill.editmode")
    .title {{skill.title}}
    .percent {{skill.percent}}
    .buttons
      icon.btn(
        symbol="pencil"
        grayscale
        @click="currentSkill.editmode=true"
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
        :errorMessage="validation.firstError('currentSkill.title')"
      )
    .percent
      app-input(
        type="number"
        min="0"
        max="100"
        maxlength="3"
        v-model="currentSkill.percent"
        :errorMessage="validation.firstError('currentSkill.percent')"
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
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentSkill.title": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "currentSkill.percent": value => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Некорректное значение")
        .required("Не может быть пустым")
    }
  },
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
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false
      }
    }
  },
  methods: {
    async approveSkill() {
      if (!(await this.$validate())) return;

      this.$emit('approve', this.currentSkill);
    },
    closeEditMode() {
      this.currentSkill = {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        editmode: false
      }
    }
  }
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>