import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";
import config from "../../env.paths.json";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    components: {
      default: () => import("./pages/about"),
      header: () => import("./components/header")
    }
  },
  {
    path: "/works",
    components: {
      default: () => import("./pages/works"),
      header: () => import("./components/header")
    }
  },
  {
    path: "/reviews",
    components: {
      default: () => import("./pages/reviews"),
      header: () => import("./components/header")
    }
  },
  {
    path: "/login",
    component: () => import("./pages/login"),
    meta: {
      public: true
    }
  }
];

const router = new VueRouter({ routes });

const guard = axios.create({
  baseURL: config.BASE_URL
});

router.beforeEach(async (to, from, next) => {
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
