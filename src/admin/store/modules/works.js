export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },
    SET_WORKS(state, works) {
      state.data = works
    },
    REMOVE_WORK: (state, removableWorkId) => {
      state.data = state.data.filter(work => work.id !== removableWorkId)
    }
  },
  actions: {
    async add({ commit }, newWork) {
      const formData = new FormData();
      
      Object.keys(newWork).forEach(item => {
        formData.append(item, newWork[item]);
      });

      try {
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    async fetch({commit, rootState}) {
      try {
        const { data } = await this.$axios.get(`/works/${rootState.user.user.id}`);
        commit("SET_WORKS", data);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    
    async remove({commit}, removableWorkId) {
      try {
        const { data } = await this.$axios.delete(`/works/${removableWorkId}`);
        commit("REMOVE_WORK", removableWorkId);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  }
}