<template>
  <div class="article-by-id">
    <PageTitle icon="fa fa-file-o" :main="article.name" sub="Artigo" />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script setup>
import { baseUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle.vue";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const article = reactive({});

onMounted(() => {
  const url = `${baseUrl}/articles/${route.params.id}`;
  axios(url).then((res) => {
    Object.assign(article, res.data.data);
  });
});
</script>

<style>
.article-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

.article-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.article-content img {
  max-width: 100%;
}

.article-content :last-child {
  margin-bottom: 0px;
}
</style>
