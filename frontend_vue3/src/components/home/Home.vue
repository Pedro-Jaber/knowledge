<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />

    <div class="stats">
      <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
      <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480" />
      <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282ee" />
    </div>
  </div>
</template>

<script setup>
import PageTitle from "@/components/template/PageTitle.vue";
import Stat from "./Stat.vue";
import axios from "axios";
import { baseUrl } from "@/global";
import { onMounted, ref } from "vue";

let stat = ref({ users: 0, categories: 0, articles: 0 });

const getStat = () => {
  axios.get(`${baseUrl}/stats`).then((res) => {
    stat.value = res.data;
    console.log("stat:", stat.value);
  });
};

onMounted(() => {
  getStat();
});
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
