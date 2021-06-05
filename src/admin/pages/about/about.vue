<template lang="pug">
  .about-page-component
    .page-content
      .container
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
              @remove-skill=""
              @edit-skill=""
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
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoriesAction: "categories/fetch"
    }),
    createCategory(categoryTitle) {
      this.createCategoryAction(categoryTitle);
    }
  },
  created() {
    this.fetchCategoriesAction();
  }
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>