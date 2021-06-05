<template lang="pug">
  .about-page-component
    .page-content
      .container(v-if="loading") Загрузка...
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
              @remove="removeCategory($event, category.id)"
              @approve="editCategory($event, category.id)"
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
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoriesAction: "categories/fetch",
      removeCategoriesAction: "categories/remove",
      editCategoriesAction: "categories/edit",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove",
      showTooltip: "tooltips/show"
    }),
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCategoryInShown = false;

        this.showTooltip({
          text: "Категория добавлена",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async addSkill(skill, id) {
      try {
        await this.addSkillAction({...skill, category: id});

        skill.title = "";
        skill.percent = "";

        this.showTooltip({
          text: "Скилл добавлен",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async editSkill(skill) {
      try {
        await this.editSkillAction(skill);

        skill.editmode = false;
        
        this.showTooltip({
          text: "Скилл отредактирован",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async removeSkill(skill) {
      try {
        await this.removeSkillAction(skill);

        this.showTooltip({
          text: "Скилл удален",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async fetchCategories() {
      try {
        await this.fetchCategoriesAction();

        this.showTooltip({
          text: "Категории загружены",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async removeCategory($event, id) {
      try {
        await this.removeCategoriesAction(id);

        this.showTooltip({
          text: "Категория удалена",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async editCategory(title, id) {
      try {
        await this.editCategoriesAction({title, id});

        this.showTooltip({
          text: "Название категории изменено",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>