import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import categories from "./modules/categories";
import skills from "./modules/skills";
import tooltips from "./modules/tooltips";
import reviews from "./modules/reviews";
import works from "./modules/works";
import user from "./modules/user";

export default new Vuex.Store({
  modules: {
    categories,
    skills,
    tooltips,
    reviews,
    works,
    user
  },
});