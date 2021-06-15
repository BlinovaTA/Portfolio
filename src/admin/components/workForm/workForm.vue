<template lang="pug">
  .work-form-component
    form.form(@submit.prevent="handleSubmit")
      card(:title="title")
        .work-form-container(slot="content")
          .work-form__cols
            .work-form__col
              label.uploader(
                :style="{backgroundImage: `url(${preview})`}"
                :class="[{active: preview}, {hovered: hovered}]"
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
                  v-model="work.title" 
                  title="Название"
                  :errorMessage="validation.firstError('work.title')"
                )
              .work-form__row
                app-input(
                  v-model="work.link" 
                  title="Ссылка"
                  :errorMessage="validation.firstError('work.link')"
                )
              .work-form__row
                app-input(
                  v-model="work.description" 
                  field-type="textarea" 
                  title="Описание"
                  :errorMessage="validation.firstError('work.description')"
                )
              .work-form__row
                tags-adder(v-model="work.techs")
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
    "work.title": value => Validator.value(value).required("Поле не заполнено"),
    "work.link": value => Validator.value(value).required("Поле не заполнено"),
    "work.description": value => Validator.value(value).required("Поле не заполнено")
  },
  components: { 
    card, 
    appButton, 
    appInput, 
    tagsAdder 
  },
  props: {
    title: String,
    work: Object
  },
  data() {
    return {
      hovered: false,
      preview: "",
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
      
      this.$emit("save", this.work);
    },
    cancelClick() {
      this.$emit("cancel");
    },
    changeImage(event) {
      event.preventDefault();
      
      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      this.work.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);      
      reader.onloadend = () => {
        this.preview = reader.result;
      };

      reader.onerror = () => {
        this.showTooltip({
          text: "Ошибка загрузки файла",
          type: "error"
        })
      }

      reader.onabort = (e) => {
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
  },
  created() {
    if (Object.keys(this.work.photo).length !== 0) {
      this.preview = `https://webdev-api.loftschool.com/${this.work.photo}`
    }
  }
}
</script>

<style lang="postcss" scoped src="./workForm.pcss"></style>