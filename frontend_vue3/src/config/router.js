import { createWebHistory, createRouter } from "vue-router";

import Home from "@/components/home/Home.vue";
import AdminPages from "@/components/admin/AdminPages.vue";
import ArticlesByCategory from "@/components/article/ArticlesByCategory.vue";
import ArticleById from "@/components/article/ArticleById.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/admin",
    component: AdminPages,
  },
  {
    path: "/articles/category/:id",
    component: ArticlesByCategory,
  },
  {
    path: "/articles/:id",
    component: ArticleById,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
