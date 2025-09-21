import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    isMenuVisible: true,
    user: {
      name: "Mock User",
      email: "mock@email.com",
    },
  }),
  actions: {
    toggleMenu(isVisible) {
      if (isVisible === undefined) this.isMenuVisible = !this.isMenuVisible;
      else this.isMenuVisible = isVisible;
    },
  },
});
