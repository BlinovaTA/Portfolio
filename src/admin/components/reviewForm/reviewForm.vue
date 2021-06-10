<template lang="pug">
  .review-form-component
    card
      template(#title)
        .review-form__title Новый отзыв
      template(#content)
        .review-form__content
          .review-form__info
            .review-form__photo
              avatar(
                :src="userPic"
                size="13"
              )
              .review-form__add-photo
                app-button(plain title="Добавить фото")
            .review-form__review-data
              .review-form__author
                app-input.review-form__name(
                  title="Имя автора" 
                  v-model="review.author"
                )
                app-input.review-form__occ(
                  title="Титул автора"
                  v-model="review.occ"
                )
              .review-form__text
                app-input(
                  title="Сообщение" 
                  fieldType="textarea"
                  v-model="review.text"
                )
          .review-form__buttons
            app-button(plain title="Отмена")
            app-button(title="Сохранить" @click="saveClick")
</template>

<script>
import card from "../card";
import avatar from "../avatar";
import appInput from "../input";
import appButton from "../button";

export default {
  components: {
    card,
    avatar,
    appInput,
    appButton
  },
  data() {
    return {
      review: {
        author: "",
        occ: "",
        text: "",
        photo: ""
      }
    }
  },
  computed: {
    userPic() {
      return require("../../../images/content/default-user.png").default;
    }
  },
  methods: {
    saveClick() {
      this.$emit("save", this.review);
    }
  }
}
</script>

<style lang="postcss" scoped src="./reviewForm.pcss"></style>