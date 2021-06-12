<template lang="pug">
  .reviews-container
    .page-content
      .container 
        .header
          .title Блок "Отзывы"
        review-form(
          v-if="showReviewForm"
          :title="titleReviewForm"
          :review="currentReview"
          @save="saveClick"
          @cancel="cancelClick"
        )
        ul.reviews__list
          .reviews__item.reviews__new-item
            btn(type="square" title="Добавить отзыв" @click="addNew")
          li.reviews__item.reviews__loaded-item(v-for="review in reviews" :key="review.id")
            review-card(
              :review="review"
              @remove="removeReview($event, review.id)"
              @edit="editReview($event, review.id)"
            )
</template>

<script>
import { mapActions, mapState } from "vuex";
import btn from "../../components/button";
import reviewForm from "../../components/reviewForm";
import reviewCard from "../../components/reviewCard";

export default {
  components: {
    btn,
    reviewForm,
    reviewCard
  },
  data() {
    return {
      showReviewForm: false,
      titleReviewForm: "",
      isEdit: false, 
      currentReview: {
        author: "",
        occ: "",
        text: "",
        photo: {}
      }
    }
  },
  computed: {
    ...mapState("reviews", {
      reviews: state => state.data,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions({
      fetchReviewsAction: "reviews/fetch",
      addReviewsAction: "reviews/add",
      removeReviewsAction: "reviews/remove",
      editReviewsAction: "reviews/edit",
      showTooltip: "tooltips/show"
    }),
    addNew() {
      this.showReviewForm = true;
      this.titleReviewForm = "Новый отзыв";
      this.isEdit = false;
      this.currentReview = {
        author: "",
        occ: "",
        text: "",
        photo: {}
      }
    },
    async saveNewReview(review) {
      try {
        await this.addReviewsAction(review);

        this.showTooltip({
          text: "Новый отзыв добавлен",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async saveEditReview(review) {
      try {
        await this.editReviewsAction(review);

        this.showTooltip({
          text: "Отзыв отредактирован",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    saveClick(review) {
      this.showReviewForm = false;

      if (this.isEdit) {
        this.saveEditReview(review);
      } else {
        this.saveNewReview(review);
      }
    },
    cancelClick() {
      this.showReviewForm = false;

      this.showTooltip({
        text: "Отзыв не сохранен",
        type: "warning"
      })
    },
    async fetchReviews() {
      try {
        await this.fetchReviewsAction();

        this.showTooltip({
          text: "Отзывы загружены",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async removeReview($event, id) {
      try {
        await this.removeReviewsAction(id);

        this.showTooltip({
          text: "Отзыв удален",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    editReview($event, id) {
      this.showReviewForm = true;
      this.titleReviewForm = "Редактирование отзыва";
      this.currentReview = {...this.reviews.find(review => review.id === id)};
      this.isEdit = true;
    }
  },
  created() {
    this.fetchReviews();
  }
}
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>