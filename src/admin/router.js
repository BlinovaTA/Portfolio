import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";
import config from "../../env.paths.json";

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

const guard = axios.create({
  baseURL: config.BASE_URL
});

router.beforeEach(async (to, from,next) => {
  const isPublicRoute = to.matched.some(route => route.meta.public);
  const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

  if (!isPublicRoute && !isUserLoggedIn) {
    const token = localStorage.getItem("token");

    guard.defaults.headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await guard.get("/user"); 
      
      store.dispatch("user/login", await response.data.user);

      next();
    } catch (error) {
      router.replace("/login");
      localStorage.removeItem("token"); 
    }
  } else {
    next();
  }
});

export default router;
