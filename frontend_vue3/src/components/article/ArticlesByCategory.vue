<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder" :main="category.name" sub="Categoria" />
    <ul class="p-0">
      <li v-for="article in articles" :key="article.id">
        {{ article.name }}
      </li>
    </ul>
    <div class="load-more d-flex justify-content-center align-items-center mt-3">
      <button v-if="loadMore" class="btn btn-outline-primary" @click="getArticles">
        Carregar Mais
      </button>
    </div>
  </div>
</template>

<script setup>
import { baseUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle.vue";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const emptyCategory = () => ({
  name: "",
});

const route = useRoute();

const category = reactive(emptyCategory());
const articles = ref([]);
const page = ref(1);
const limit = ref(3);
const loadMore = ref(true);

const getCategory = () => {
  const url = `${baseUrl}/categories/${category.id}`;
  axios(url).then((res) => {
    Object.assign(category, res.data.data);
    // console.log("category:", category);
  });
};

const getArticles = () => {
  const url = `${baseUrl}/articles/category/${category.id}?page=${page.value}&limit=${limit.value}`;
  axios(url).then((res) => {
    articles.value = articles.value.concat(res.data.data);
    page.value++;

    if (res.data.data.length < limit.value) loadMore.value = false;
    // console.log("articles:", articles.value);
  });
};

onMounted(() => {
  console.log("route:", route);
  category.id = route.params.id;
  getCategory();
  getArticles();
});
</script>

<style>
.articles-by-category ul {
  list-style: none;
}
</style>
