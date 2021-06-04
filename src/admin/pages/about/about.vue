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

export default {
  components: {
    iconedButton: button,
    category
  },
  data() {
    return {
      categories: [],
      emptyCategoryInShown: false
    };
  },
  created() {
    this.categories = require("../../data/categories.json");
  }
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>