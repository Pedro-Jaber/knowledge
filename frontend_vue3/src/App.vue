<template>
  <div id="app" :class="{ 'hide-menu': !store.isMenuVisible || !store.user }">
    <Header
      title="Knowledge"
      :hideToggle="!store.user"
      :hideUserDropdown="!store.user"
      class="bg-primary"
    />
    <Menu v-if="store.user" />
    <Content />
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/template/Header.vue";
import Menu from "@/components/template/Menu.vue";
import Content from "@/components/template/Content.vue";
import Footer from "@/components/template/Footer.vue";

import { useStore } from "@/config/store";
const store = useStore();

// Não precisa por conta do setup
// export default {
//   name: "App",
//   components: { Header, Menu, Content, Footer },
// };
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  height: 100vh;
  width: 100vw;
  display: grid;

  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
