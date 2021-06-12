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
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="changeImage"
              )
                .uploader-title Перетащите или загрузите для загрузки изображения
                .uploader-btn
                  app-button(
                    typeAttr="file" 
                    title="Загрузить"
                    @change="changeImage"
                  )
            .work-form__col
              .work-form__row
                app-input(
                  v-model="newWork.title" 
                  title="Название"
                  :errorMessage="validation.firstError('newWork.title')"
                )
              .work-form__row
                app-input(
                  v-model="newWork.link" 
                  title="Ссылка"
                  :errorMessage="validation.firstError('newWork.link')"
                )
              .work-form__row
                app-input(
                  v-model="newWork.description" 
                  field-type="textarea" 
                  title="Описание"
                  :errorMessage="validation.firstError('newWork.description')"
                )
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
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "newWork.title": value => Validator.value(value).required("Поле не заполнено"),
    "newWork.link": value => Validator.value(value).required("Поле не заполнено"),
    "newWork.description": value => Validator.value(value).required("Поле не заполнено")
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
    ...mapActions({
      showTooltip: "tooltips/show"
    }),
    async handleSubmit() {
      if (!(await this.$validate())) {
        return;
      }
      
      this.$emit("save", this.newWork);
    },
    cancelClick() {
      this.$emit("cancel");
    },
    changeImage(event) {
      event.preventDefault();
      
      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);      
      reader.onloadend = () => {
        this.newWork.preview = reader.result;
      };

      render.onerror = () => {
        this.showTooltip({
          text: "Ошибка загрузки файла",
          type: "error"
        })
      }

      render.onabort = (e) => {
        this.showTooltip({
          text: "Загрузка файла прервана",
          type: "error"
        })
      }
    },
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    }
  }
}
</script>

<style lang="postcss" scoped src="./workForm.pcss"></style>