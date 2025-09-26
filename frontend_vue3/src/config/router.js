import { createWebHistory, createRouter } from "vue-router";

import Home from "@/components/home/Home.vue";
import AdminPages from "@/components/admin/AdminPages.vue";
import ArticlesByCategory from "@/components/article/ArticlesByCategory.vue";
import ArticleById from "@/components/article/ArticleById.vue";
import Auth from "@/components/auth/Auth.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Admin",
    path: "/admin",
    component: AdminPages,
  },
  {
    name: "ArticlesByCategory",
    path: "/articles/category/:id",
    component: ArticlesByCategory,
  },
  {
    name: "ArticleById",
    path: "/articles/:id",
    component: ArticleById,
  },
  {
    name: "Auth",
    path: "/auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
