import Vue from "vue";
import VueRouter from "vue-router";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Detail
  }
];

const router = new VueRouter({
  routes
});

export default router;
