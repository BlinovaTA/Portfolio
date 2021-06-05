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
    async remove({commit}, removableSkill) {
      try {
        const { data } = await this.$axios.delete(`/skills/${removableSkill.id}`);
        commit("categories/REMOVE_SKILL", removableSkill, { root: true });
      } catch (error) {
        throw new Error("Ошибка");
      }
    }
  }
}