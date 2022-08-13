import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PsDrag from "../components/PsDrag/PsDrag.vue";
import Phisic from "../components/Phisic/Phisic.vue";
import SpeedSimulator from "../components/SpeedSimulator/SpeedSimulator.vue";
import MathTrainer from "../components/MathTrainer/MathTrainer.vue";

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
    path: "/speedsimulator",
    name: "speedsimulator",
    component: SpeedSimulator,
  },
  {
    path: "/mathtrainer",
    name: "mathtrainer",
    component: MathTrainer,
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
