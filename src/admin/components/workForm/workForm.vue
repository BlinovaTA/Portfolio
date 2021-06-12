<template lang="pug">
  .work-form-component
    form.form(@submit.prevent="handleSubmit")
      card(title="Добавление работы")
        .work-form-container(slot="content")
          .work-form__cols
            .work-form__col
              label.uploader(
                :style="{backgroundImage: `url(${newWork.preview})`}"
                :class="[{active: newWork.preview}, {hovered: hovered}]"
              )
                .uploader-title Перетащите или загрузите для загрузки изображения
                .uploader-btn
                  app-button(typeAttr="file")
            .work-form__col
              .work-form__row
                app-input(v-model="newWork.title" title="Название")
              .work-form__row
                app-input(v-model="newWork.link" title="Ссылка")
              .work-form__row
                app-input(v-model="newWork.description" field-type="textarea" title="Описание")
              .work-form__row
                tags-adder(v-model="newWork.techs")
          .work-form__btns
            .work-form__btn
              app-button(title="Отмена" plain @click="cancelClick")
            .work-form__btn
              app-button(title="Сохранить")
</template>

<script>
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";

export default {
  mixins: [ValidatorMixin],
  validators: {
  },
  components: { 
    card, 
    appButton, 
    appInput, 
    tagsAdder 
  },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("save", this.newWork);
    },
    cancelClick() {
      this.$emit("cancel");
    }    
  }
}
</script>

<style lang="postcss" scoped src="./workForm.pcss"></style>