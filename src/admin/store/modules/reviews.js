export default {
  namespaced: true,
  state: {
    data: [],
    loading: false
  },
  mutations: {
    SET_LOADING: (state, loading) => (state.loading = loading),
    SET_REVIEWS: (state, reviews) => (state.data = reviews),
    ADD_REVIEWS: (state, review) => {},
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
    async fetch({commit}) {
      try {
        commit("SET_LOADING", true);

        /* const response = await this.$axios.get('/user');
        const { data } = await this.$axios.get(`/reviews/${response.data.user.id}`); */

        const data = [
          {
            "id": 0,
            "author": "Ковальчук Дмитрий",
            "occ": "Основатель Loftschool",
            "text": "1 Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!",
            "photo": "user.jpg"
          },
          {
            "id": 1,
            "author": "Владимир Сабанцев",
            "occ": "Преподаватель",
            "text": "2 Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах",
            "photo": "user.jpg"
          },
          {
            "id": 2,
            "author": "Ковальчук Дмитрий",
            "occ": "Основатель Loftschool",
            "text": "3 Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!",
            "photo": "user.jpg"
          },
          {
            "id": 3,
            "author": "Владимир Сабанцев",
            "occ": "Преподаватель",
            "text": "4 Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах",
            "photo": "user.jpg"
          },
          {
            "id": 4,
            "author": "Ковальчук Дмитрий",
            "occ": "Основатель Loftschool",
            "text": "5 Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!",
            "photo": "user.jpg"
          },
          {
            "id": 5,
            "author": "Владимир Сабанцев",
            "occ": "Преподаватель",
            "text": "6 Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах",
            "photo": "user.jpg"
          },
          {
            "id": 6,
            "author": "Ковальчук Дмитрий",
            "occ": "Основатель Loftschool",
            "text": "7 Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!",
            "photo": "user.jpg"
          },
          {
            "id": 7,
            "author": "Владимир Сабанцев",
            "occ": "Преподаватель",
            "text": "8 Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах",
            "photo": "user.jpg"
          }
        ];

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
  }
}