export default {
  namespaced: true,
  state: {

  },
  mutation: {
    
  },
  actions: {
    async add({commit}, skill) {
      try {
        const { data } = await this.$axios.post('/skills', skill);
        commit("categories/ADD_SKILL", data, { root: true });
      } catch (error) {
        throw new Error("Ошибка");
      }
    },
    edit() {
      console.log("edit");
    },
    remove() {
      console.log("remove");
    }
  }
}