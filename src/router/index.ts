import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import TemplateDetail from "../views/TemplateDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/editor",
      name: "editor",
      component: Editor,
    },
    {
      path: "/template/:id",
      name: "template",
      component: TemplateDetail,
    },
  ],
});

export default router;
