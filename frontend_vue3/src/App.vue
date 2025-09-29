<template>
  <div id="app" :class="{ 'hide-menu': !store.isMenuVisible || !store.user }">
    <Header
      title="Knowledge"
      :hideToggle="!store.user"
      :hideUserDropdown="!store.user"
      class="bg-primary"
    />
    <Menu v-if="store.user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script setup>
import axios from "axios";
import { baseUrl, userKey } from "./global";
import Header from "@/components/template/Header.vue";
import Menu from "@/components/template/Menu.vue";
import Content from "@/components/template/Content.vue";
import Footer from "@/components/template/Footer.vue";
import Loading from "./components/template/Loading.vue";

import { onMounted, ref } from "vue";

import { useStore } from "@/config/store";
const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

// Não precisa por conta do setup
// export default {
//   name: "App",
//   components: { Header, Menu, Content, Footer },
// };

const validatingToken = ref(true);

const validatetoken = async () => {
  // console.log("validatetoken()");
  validatingToken.value = true;

  const json = localStorage.getItem(userKey);
  const userData = JSON.parse(json);

  // console.log("userData:", userData);

  store.setUser(null);

  if (!userData) {
    validatingToken.value = false;
    router.push({ name: "Auth" });
    return;
  }

  const res = await axios.post(`${baseUrl}/validateToken`, userData);

  if (res.data) {
    store.setUser(userData);
  } else {
    localStorage.removeItem(userKey);
    router.push({ name: "Auth" });
  }

  validatingToken.value = false;
};

onMounted(() => validatetoken());
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
