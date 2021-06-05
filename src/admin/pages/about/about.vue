<template lang="pug">
  .about-page-component
    .page-content
      .container(v-if="loading") Загрузка...
      .container(v-else-if="error") Произошла ошибка
      .container(v-else) 
        .header
          .title Блок "Обо мне"
          iconed-button(
            type="iconed" 
            title="Добавить группу"
            @click="emptyCategoryInShown = true"
            v-if="!emptyCategoryInShown"
          )
        ul.skills
          li.item(v-if="emptyCategoryInShown")
            category(
              empty
              @remove="emptyCategoryInShown = false"
              @approve="createCategory"
            )
          li.item(v-for="category in categories" :key="category.id")
            category(
              :title="category.category"
              :skills="category.skills"
              @add-skill="addSkill($event, category.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
            )
</template>

<script>
import button from "../../components/button";
import category from "../../components/category";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    iconedButton: button,
    category
  },
  data() {
    return {
      emptyCategoryInShown: false
    };
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.data,
      loading: state => state.loading,
      error: state => state.error
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoriesAction: "categories/fetch",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove"
    }),
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCategoryInShown = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    async addSkill(skill, id) {
      await this.addSkillAction({...skill, category: id});

      skill.title = "";
      skill.percent = "";
    },
    async editSkill(skill) {
      await this.editSkillAction(skill);

      skill.editmode = false;
    },
    removeSkill(skill) {
      this.removeSkillAction(skill);
    }
  },
  created() {
    this.fetchCategoriesAction();
  }
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>