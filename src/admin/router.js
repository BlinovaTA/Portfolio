import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import login from "./pages/login";
import about from "./pages/about";

const routes = [
  {
    path: "/",
    component: about
  },
  {
    path: "/login",
    component: login
  }
];

export default new VueRouter({ routes, mode: "history" });
