<template lang="pug">
  .reviews-container
    .page-content
      .container 
        .header
          .title Блок "Отзывы"
        ul.reviews__list
          .reviews__item.reviews__new-item
            btn(type="square" title="Добавить отзыв")
          li.reviews__item.reviews__loaded-item(v-for="review in reviews" :key="review.id")
            card
              template(#title)
                .review__header
                  avatar(size="2.7" :src="review.photo").review__avatar
                  .review__header-info
                    .review__author {{review.author}}
                    .review__position {{review.occ }}
              template(#content)
                .review__content
                  .review__text {{review.text}}
                .review__actions
                  icon(title="Править" symbol="pencil").review__edit
                  icon(title="Удалить" symbol="cross").review__cross
</template>

<script>
import { mapActions, mapState } from "vuex";
import btn from "../../components/button";
import card from "../../components/card";
import avatar from "../../components/avatar";
import icon from "../../components/icon";

export default {
  components: {
    btn,
    card,
    avatar,
    icon
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
      showTooltip: "tooltips/show"
    }),
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