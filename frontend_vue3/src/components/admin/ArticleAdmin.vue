<template>
  <div class="article-admin">
    <form>
      <input id="article-id" type="hidden" v-model="article.id" />

      <!-- Nome e Descrição -->
      <div class="row">
        <!-- Nome -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="article-name">Nome</label>
            <input
              id="article-name"
              type="text"
              class="form-control"
              placeholder="Informe o nome do Artigo"
              v-model="article.name"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>

        <!-- Descrição -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="article-description">Descrição</label>
            <input
              id="article-description"
              type="text"
              class="form-control"
              placeholder="Informe a descrição do Artigo"
              v-model="article.description"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>
      </div>

      <!-- URL imagem -->
      <div class="row mt-3">
        <!-- URL imagem -->
        <div class="col-12">
          <div class="form-group">
            <label for="article-image">URL da imagem</label>
            <input
              id="article-image"
              type="text"
              class="form-control"
              placeholder="Informe a URL da imagem"
              v-model="article.imageUrl"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>
      </div>

      <!-- Categoria -->
      <div class="row mt-3">
        <!-- Categoria -->
        <div class="col-12">
          <div class="form-group">
            <label for="article-categoryId">Categoria</label>
            <select
              id="article-categoryId"
              class="form-select"
              v-model="article.categoryId"
              aria-label=""
              required
              :disabled="mode === 'remove'"
            >
              <option selected disabled value="">Selecione uma categoria</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Usuarios -->
      <div class="row mt-3">
        <!-- Usuarios -->
        <div class="col-12">
          <div class="form-group">
            <label for="article-userId">Usuários</label>
            <select
              id="article-userId"
              class="form-select"
              v-model="article.userId"
              aria-label=""
              required
              :disabled="mode === 'remove'"
            >
              <option selected disabled value="">Selecione um usuário</option>
              <option v-for="user in users" :key="user.value" :value="user.value">
                {{ user.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Conteudo -->
      <div class="form-group mt-3" v-show="mode === 'save'">
        <label for="article-content">Conteudo</label>
        <Tiptap
          id="article-content"
          v-model="article.content"
          class="form-control"
          :disabled="mode === 'remove'"
        />
      </div>

      <div class="row mt-3">
        <div class="col-12">
          <button type="button" class="btn btn-primary" v-if="mode === 'save'" @click="save">
            Salvar
          </button>
          <button type="button" class="btn btn-danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </button>

          <button type="button" class="btn btn-secondary ms-2" @click="reset">Cancelar</button>
        </div>
      </div>
    </form>
    <hr />
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <th scope="row">{{ article.id }}</th>
          <td>{{ article.name }}</td>
          <td>{{ article.description }}</td>
          <td>
            <button type="button" class="btn btn-warning" @click="loadArticle(article, 'save')">
              <i class="fa fa-pencil"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger ms-2"
              @click="loadArticle(article, 'remove')"
            >
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <Pagination v-model="page" :total-items="count" :per-page="limit" />
    </div>
  </div>
</template>

<script setup>
import { baseUrl, showError, showSuccess } from "@/global";
import axios from "axios";
import { ref, reactive, onMounted, watch } from "vue";

import Tiptap from "../Tiptap.vue";
import Pagination from "../Pagination.vue";

const emptyArticle = () => ({
  name: "",
  description: "",
  imageUrl: "",
  content: "",
  categoryId: null,
  userId: null,
});

let mode = ref("save");
let article = reactive(emptyArticle());
let articles = ref([]);

// Form
let categories = ref([]);
let users = ref([]);

// Pagination
let page = ref(1);
let limit = ref(10);
let count = ref(0);

watch(page, () => loadArticles());

const loadCategories = () => {
  const url = `${baseUrl}/categories`;
  axios.get(url).then((res) => {
    categories.value = res.data.data.map((category) => {
      return { value: category.id, label: category.path };
    });

    // console.log("categories:", categories.value);
  });
};

const loadUsers = () => {
  const url = `${baseUrl}/users`;
  axios.get(url).then((res) => {
    users.value = res.data.data.map((user) => {
      return { value: user.id, label: user.name };
    });
    // console.log("users:", users.value);
  });
};

const loadArticles = () => {
  const url = `${baseUrl}/articles?page=${page.value}&limit=${limit.value}`;
  axios.get(url).then((res) => {
    articles.value = res.data.data;
    count.value = res.data.count;
    limit.value = res.data.limit;
    // console.log("articles:", articles.value);
    // console.log("count:", count);
    // console.log("limit:", limit);
  });
};

const loadArticle = (_article, _mode = "save") => {
  mode.value = _mode;

  const url = `${baseUrl}/articles/${_article.id}`;
  axios.get(url).then((res) => {
    Object.assign(article, { ...res.data.data });
  });

  console.log("article:", article);
};

const reset = () => {
  mode.value = "save";
  Object.assign(article, emptyArticle());
  delete article.id;
  loadArticles();
};

const save = () => {
  const method = article.id ? "put" : "post";
  const id = article.id ? `/${article.id}` : "";
  axios[method](`${baseUrl}/articles${id}`, {
    name: article.name,
    description: article.description,
    imageUrl: article.imageUrl,
    content: article.content,
    userId: article.userId,
    categoryId: article.categoryId,
  })
    .then(() => {
      showSuccess("Categoria salvo com sucesso!");
      reset();
    })
    .catch(showError);
};

const remove = () => {
  const id = article.id;
  axios
    .delete(`${baseUrl}/articles/${id}`)
    .then(() => {
      showSuccess("Categoria removido com sucesso!");
      reset();
    })
    .catch(showError);
};

onMounted(() => {
  loadArticles();
  loadCategories();
  loadUsers();
});
</script>

<style></style>
