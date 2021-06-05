export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category)
  },
  actions: {
    async create({commit}, title) {
      try {
        const {data} = await this.$axios.post('/categories', { title });
        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error("Произошла ошибка");
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