export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories)
  },
  actions: {
    async create(store, title) {
      try {
        const response = await this.$axios.post('/categories', { title });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async fetch({commit}) {
      try {
        const response = await this.$axios.get('/user');
        const { data } = await this.$axios.get(`/categories/${response.data.user.id}`);

        commit("SET_CATEGORIES", data);
      } catch (error) {
        console.log(error);
      }
    },
  }
};