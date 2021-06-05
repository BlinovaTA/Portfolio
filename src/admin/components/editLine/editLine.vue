<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorMessage="errorMessage"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="onRemove"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    blocked: Boolean,
    editModeByDefault: Boolean
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value,
      errorMessage: ""
    };
  },
  methods: {
    onApprove() {
      this.errorMessage = "";

      if (this.value.trim() === "") {
        this.errorMessage = "Заполните поле";

        return false;
      }

      if (this.title.trim() === this.value.trim()) {
        this.editmode = false;
      } else {
        this.$emit("approve", this.value);
      }
    },
    onRemove() {
      this.$emit('remove');
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>