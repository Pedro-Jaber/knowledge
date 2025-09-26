<template>
  <aside class="menu" v-show="store.isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder="Buscar..." class="filter-field" v-model="treeFilter" />
    </div>
    <vue3-tree-vue :items="treeData_filtered" @onSelect="onItemSelected"> </vue3-tree-vue>
  </aside>
</template>

<script setup>
import { useStore } from "@/config/store";
import { baseUrl } from "@/global";
import axios from "axios";

// import Tree from "../tree/Tree.vue";
import Vue3TreeVue from "vue3-tree-vue";

import { onMounted, ref, watch } from "vue";
import router from "@/config/router";

const store = useStore();

const treeFilter = ref("");
const treeData = ref([]);
const treeData_filtered = ref([]);

watch(treeFilter, () => {
  console.log("treeFilter:", treeFilter.value);
  if (treeFilter.value === "") return (treeData_filtered.value = treeData.value);
  treeData_filtered.value = treeData.value.filter((item) => item.name.includes(treeFilter.value));
});

watch(treeData, () => {
  treeData_filtered.value = treeData.value;
});

// Methods
const getTreeData = async () => {
  const url = `${baseUrl}/categories/tree`;
  const res = await axios.get(url);
  console.log("treeData:", res.data.data);
  return res.data.data || [];
};

const onItemSelected = (item) => {
  // console.log("item:", item);
  router.push({ name: "ArticlesByCategory", params: { id: item.id } });
};

// Lifecycle
onMounted(() => {
  getTreeData().then((data) => (treeData.value = data));
});
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  color: #fff;
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu .menu-filter input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}
</style>
