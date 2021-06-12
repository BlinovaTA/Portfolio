import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import login from "./pages/login";
import about from "./pages/about";
import works from "./pages/works";
import reviews from "./pages/reviews";
import header from "./components/header";

const routes = [
  {
    path: "/",
    components: {
      default: about,
      header
    }
  },
  {
    path: "/works",
    components: {
      default: works,
      header
    }
  },
  {
    path: "/reviews",
    components: {
      default: reviews,
      header
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      public: true
    }
  }
];

const router = new VueRouter({ routes });

router.beforeEach((to, from,next) => {
  const isPublicRoute = to.matched.some(route => route.meta.public);
  next();
});

export default router;
