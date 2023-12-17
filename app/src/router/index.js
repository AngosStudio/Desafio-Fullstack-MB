import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/registration", component: RegistrationPage },
];

const router = new VueRouter({
  routes,
});

export default router;
