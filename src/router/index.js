import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PsDrag from "../components/PsDrag/PsDrag.vue";
import Phisic from "../components/Phisic/Phisic.vue";
import Rekurwencja from "../components/Rekurwencja/Rekurwencja.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dountTouchMe",
    name: "dountTouchMe",
    component: PsDrag,
  },
  {
    path: "/phisic",
    name: "phisic",
    component: Phisic,
  },
  {
    path: "/rekurwencja",
    name: "rekurwencja",
    component: Rekurwencja,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
