<template lang="pug">
  .skill-add-line-component(:class="{blocked: blocked}")
    .title
      app-input(
        placeholder="Новый навык"
      )
    .percent
      app-input(
        type="number" 
        min="0" 
        max="100" 
        maxlength="3"
      )
    .button
      round-button(
        type="round"
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
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>