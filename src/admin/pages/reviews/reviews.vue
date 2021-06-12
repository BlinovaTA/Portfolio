<template lang="pug">
  .reviews-container
    .page-content
      .container 
        .header
          .title Блок "Отзывы"
        review-form(
          v-if="showReviewForm"
          @save="saveReview"
          @cancel="cancelClick"
        )
        ul.reviews__list
          .reviews__item.reviews__new-item
            btn(type="square" title="Добавить отзыв" @click="addNew")
          li.reviews__item.reviews__loaded-item(v-for="review in reviews" :key="review.id")
            review-card(:review="review")
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
      showReviewForm: false
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
      showTooltip: "tooltips/show"
    }),
    addNew() {
      this.showReviewForm = true;
    },
    async saveReview(review) {
      this.showReviewForm = false;

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
    }
  },
  created() {
    this.fetchReviews();
  }
}
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>