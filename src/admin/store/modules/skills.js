export default {
  namespaced: true,
  actions: {
    async add({commit}, skill) {
      try {
        const { data } = await this.$axios.post('/skills', skill);
        commit("categories/ADD_SKILL", data, { root: true });
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    async edit({commit}, editableSkill) {
      try {
        const { data } = await this.$axios.post(`/skills/${editableSkill.id}`, editableSkill);
        commit("categories/EDIT_SKILL", data.skill, { root: true });
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    async remove({commit}, removableSkill) {
      try {
        const { data } = await this.$axios.delete(`/skills/${removableSkill.id}`);
        commit("categories/REMOVE_SKILL", removableSkill, { root: true });
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    }
  }
}