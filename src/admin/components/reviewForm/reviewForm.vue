<template lang="pug">
  .review-form-component
    form.form(@submit.prevent="handleSubmit")
      card(title="Новый отзыв")
        .review-form__container(slot="content")
          .review-form__info
            .review-form__photo
              avatar(
                :src="preview"
                size="13"
              )
              .review-form__add-photo
                app-button(
                  plain
                  typeAttr="file" 
                  title="Добавить фото"
                  @change="changeImage"
                )
            .review-form__review-data
              .review-form__author
                app-input.review-form__name(
                  title="Имя автора" 
                  v-model="review.author"
                  :errorMessage="validation.firstError('review.author')"
                )
                app-input.review-form__occ(
                  title="Титул автора"
                  v-model="review.occ"
                  :errorMessage="validation.firstError('review.occ')"
                )
              .review-form__text
                app-input(
                  title="Сообщение" 
                  fieldType="textarea"
                  v-model="review.text"
                  :errorMessage="validation.firstError('review.text')"
                )
          .review-form__buttons
            .review-form__btn
              app-button(plain title="Отмена" @click="cancelClick")
            .review-form__btn
              app-button(title="Сохранить")
</template>

<script>
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import card from "../card";
import avatar from "../avatar";
import appInput from "../input";
import appButton from "../button";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "review.author": value => Validator.value(value).required("Поле не заполнено"),
    "review.occ": value => Validator.value(value).required("Поле не заполнено"),
    "review.text": value => Validator.value(value).required("Поле не заполнено")
  },
  components: {
    card,
    avatar,
    appInput,
    appButton
  },
  data() {
    return {
      preview: "",
      review: {
        author: "",
        occ: "",
        text: "",
        photo: {}
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (!(await this.$validate())) {
        return;
      }

      this.$emit("save", this.review);
    },
    cancelClick() {
      this.$emit("cancel");
    },
    changeImage(event) {
      event.preventDefault();
      
      const file = event.target.files[0];

      this.review.photo = file;
      this.renderPhoto(file);
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
  },
  created() {
    this.preview = require("../../../images/content/default-user.png").default;
  }
}
</script>

<style lang="postcss" scoped src="./reviewForm.pcss"></style>