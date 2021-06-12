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
    },
    EDIT_WORK: (state, editedWork) => {
      state.data = state.data.map(work => {
        if (work.id === editedWork.id) {
          work = editedWork;
        }

        return work;
      })
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

    async edit({commit}, editedWork) {
      try {
        const formData = new FormData();

        Object.keys(editedWork).forEach(item => {
          formData.append(item, editedWork[item]);
        });

        const { data } = await this.$axios.post(`/works/${editedWork.id}`, formData);
        commit("EDIT_WORK", data.work);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    }
  }
}