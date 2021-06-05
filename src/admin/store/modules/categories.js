export default {
  namespaced: true,
  state: {
    data: [],
    loading: false
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    SET_LOADING: (state, loading) => (state.loading = loading),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (newSkill.category === category.id) {
          category.skills.push(newSkill);
        }

        return category;
      });
    },
    REMOVE_SKILL: (state, removableSkill) => {
      state.data = state.data.map(category => {
        if (removableSkill.category === category.id) {
          category.skills = category.skills.filter(skill => skill.id !== removableSkill.id)
        }

        return category;
      });
    },
    EDIT_SKILL: (state, editableSkill) => {
      const editSkillInCategory = category => {
        category.skills = category.skills.map(skill => {
          return skill.id === editableSkill.id ? editableSkill : skill
        })
      }

      const findCategory = category => {
        if (category.id === editableSkill.category) {
          editSkillInCategory(category);
        }

        return category;
      }

      state.data = state.data.map(findCategory);
    },
    REMOVE_CATEGORY: (state, removableCategoryId) => {
      state.data = state.data.filter(category => category.id !== removableCategoryId)
    },
    EDIT_CATEGORY: (state, {title, id}) => {
      state.data = state.data.map(category => {
        if (category.id === id) {
          category.category = title;
        }

        return category;
      })
    }
  },
  actions: {
    async create({commit}, title) {
      try {
        commit("SET_LOADING", true);

        const {data} = await this.$axios.post('/categories', { title });

        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error(error.response.data.error);
      }finally {
        commit("SET_LOADING", false);
      }
    },
    async fetch({commit}) {
      try {
        commit("SET_LOADING", true);

        const response = await this.$axios.get('/user');
        const { data } = await this.$axios.get(`/categories/${response.data.user.id}`);

        commit("SET_CATEGORIES", data);
      } catch (error) {
        throw new Error(error.response.data.error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async remove({commit}, removableCategoryId) {
      try {
        const { data } = await this.$axios.delete(`/categories/${removableCategoryId}`);
        commit("REMOVE_CATEGORY", removableCategoryId);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    async edit({commit}, {title, id}) {
      try {
        const { data } = await this.$axios.post(`/categories/${id}`, { title });
        commit("EDIT_CATEGORY", {title, id});
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    }
  }
};