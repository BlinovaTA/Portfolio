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
    EDIT_REVIEW: (state, editedReview) => {
      state.data = state.data.map(review => {
        if (review.id === editedReview.id) {
          review = editedReview;
        }

        return review;
      })
    },
    REMOVE_REVIEW: (state, removableReviewId) => {
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
        commit("REMOVE_REVIEW", removableReviewId);
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
    async edit({commit}, editedReview) {
      try {
        const formData = new FormData();

        Object.keys(editedReview).forEach(item => {
          formData.append(item, editedReview[item]);
        });

        const { data } = await this.$axios.post(`/reviews/${editedReview.id}`, formData);
        commit("EDIT_REVIEW", data.review);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    }
  }
}