<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
      <!--  fa fa-angle-left -->
    </a>
    <h1 class="title">
      <RouterLink to="/">{{ title }}</RouterLink>
    </h1>

    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<!--
  <script setup>
  -->
<script>
/* script */
import UserDropdown from "./UserDropdown.vue";

import { useStore } from "@/config/store";

export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean,
  },

  setup() {
    const store = useStore();
    return { store };
  },

  computed: {
    icon() {
      return this.store.isMenuVisible ? "fa-angle-down" : "fa-angle-left";
    },
  },
  methods: {
    toggleMenu() {
      // console.log("toggleMenu");
      this.store.toggleMenu();
      // this.store.isMenuVisible = !this.store.isMenuVisible;
    },
  },
};

/* script setup */
// import { useStore } from "@/config/store";
// const store = useStore();

// const props = defineProps({
//   title: String,
//   hideToggle: Boolean,
// });

// const icon = "fa-angle-left";
// const toggleMenu = () => store.toggleMenu();
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a3f1);

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
