import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import TemplateDetail from "../views/TemplateDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
          meta: { title: "欢迎来到慕课乐高" },
        },
        {
          path: "template/:id",
          name: "TemplateDetail",
          component: TemplateDetail,
          meta: { title: "模版详情" },
        },
      ],
    },
    {
      path: "/editor",
      name: "editor",
      component: Editor,
    },
  ],
});

export default router;
