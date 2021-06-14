import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSimpleValidator from "simple-vue-validator";
import store from "./store";
import $axios from "axios";
import config from "../../env.paths.json";

Vue.use(VueSimpleValidator, { mode: "manual" });

$axios.defaults.baseURL = config.BASE_URL;
store.$axios = $axios;

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App),
});
