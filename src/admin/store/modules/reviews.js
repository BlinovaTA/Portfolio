export default {
  namespaced: true,
  state: {
    data: [],
    loading: false
  },
  mutations: {
    SET_LOADING: (state, loading) => (state.loading = loading),
    SET_REVIEWS: (state, reviews) => (state.data = reviews),
    ADD_REVIEW: (state, newReview) => {
      state.data.push(newReview);
    },
    EDIT_REVIEWS: (state, {title, id}) => {
      state.data = state.data.map(category => {
        if (category.id === id) {
          category.category = title;
        }

        return category;
      })
    },
    REMOVE_REVIEWS: (state, removableReviewId) => {
      state.data = state.data.filter(review => review.id !== removableReviewId)
    }
  },
  actions: {
    async fetch({commit, rootState}) {
      try {
        commit("SET_LOADING", true);

        const { data } = await this.$axios.get(`/reviews/${rootState.user.user.id}`);

        commit("SET_REVIEWS", data);
      } catch (error) {
        throw new Error(error.response.data.error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async remove({commit}, removableReviewId) {
      try {
        const { data } = await this.$axios.delete(`/reviews/${removableReviewId}`);
        commit("REMOVE_REVIEWS", removableReviewId);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    async add({ commit }, newReview) {
      const formData = new FormData();
      
      Object.keys(newReview).forEach(item => {
        formData.append(item, newReview[item]);
      });

      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEW", data);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  }
}