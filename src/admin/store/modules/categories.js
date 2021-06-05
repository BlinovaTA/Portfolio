export default {
  namespaced: true,
  state: {
    data: [],
    loading: false,
    error: false
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    SET_LOADING: (state, loading) => (state.loading = loading),
    SET_ERROR: (state, error) => (state.error = error),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (newSkill.category === category.id) {
          category.skills.push(newSkill);
        }

        return category;
      })
    }
  },
  actions: {
    async create({commit}, title) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", false);

        const {data} = await this.$axios.post('/categories', { title });

        commit("ADD_CATEGORY", data);
        commit("SET_ERROR", false);
      } catch (error) {
        commit("SET_ERROR", true);
        throw new Error("Произошла ошибка");
      }finally {
        commit("SET_LOADING", false);
      }
    },
    async fetch({commit}) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", false);

        const response = await this.$axios.get('/user');
        const { data } = await this.$axios.get(`/categories/${response.data.user.id}`);

        commit("SET_CATEGORIES", data);
        commit("SET_ERROR", false);
      } catch (error) {
        commit("SET_ERROR", true);
        console.log(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  }
};