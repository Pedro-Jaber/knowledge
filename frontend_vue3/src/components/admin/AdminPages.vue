<template>
  <div class="admin-page">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros e Configurações" />
    <div class="admin-pages-tabs p-2">
      <!-- Tabs -->
      <ul class="nav nav-pills mb-3" id="myTab" role="tablist">
        <!-- Artigos -->
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="artigos-tab"
            data-bs-toggle="pill"
            data-bs-target="#artigos-tab-pane"
            type="button"
            role="tab"
            aria-controls="artigos-tab-pane"
            aria-selected="true"
          >
            Artigos
          </button>
        </li>

        <!-- Categorias -->
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="categorias-tab"
            data-bs-toggle="pill"
            data-bs-target="#categorias-tab-pane"
            type="button"
            role="tab"
            aria-controls="categorias-tab-pane"
            aria-selected="false"
          >
            Categorias
          </button>
        </li>

        <!-- Usuários -->
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="usuarios-tab"
            data-bs-toggle="pill"
            data-bs-target="#usuarios-tab-pane"
            type="button"
            role="tab"
            aria-controls="usuarios-tab-pane"
            aria-selected="false"
          >
            Usuários
          </button>
        </li>
      </ul>

      <!-- Tabs Content -->
      <div class="tab-content" id="myTabContent">
        <!-- Artigos -->
        <div
          class="tab-pane fade show active"
          id="artigos-tab-pane"
          role="tabpanel"
          aria-labelledby="artigos-tab"
          tabindex="0"
        >
          <ArticleAdmin />
        </div>

        <!-- Categorias -->
        <div
          class="tab-pane fade"
          id="categorias-tab-pane"
          role="tabpanel"
          aria-labelledby="categorias-tab"
          tabindex="0"
        >
          <CategoryAdmin />
        </div>

        <!-- Usuários -->
        <div
          class="tab-pane fade"
          id="usuarios-tab-pane"
          role="tabpanel"
          aria-labelledby="usuarios-tab"
          tabindex="0"
        >
          <UserAdmin />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageTitle from "../template/PageTitle.vue";
import ArticleAdmin from "./ArticleAdmin.vue";
import CategoryAdmin from "./CategoryAdmin.vue";
import UserAdmin from "./UserAdmin.vue";
</script>

<style>
.admin-pages-tabs {
  background-color: #fff;
  border-radius: 8px;
}
</style>
