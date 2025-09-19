<template>
  <aside class="menu" v-show="store.isMenuVisible"></aside>
</template>

<script setup>
import { useStore } from "@/config/store";
const store = useStore();
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
