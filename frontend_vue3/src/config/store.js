import axios from "axios";
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    isMenuVisible: false,
    user: null,
  }),
  actions: {
    toggleMenu(isVisible) {
      if (!this.user) {
        this.isMenuVisible = false;
        return;
      }

      if (isVisible === undefined) this.isMenuVisible = !this.isMenuVisible;
      else this.isMenuVisible = isVisible;
    },
    setUser(user) {
      this.user = user;

      if (user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        this.isMenuVisible = true;
      } else {
        delete axios.defaults.headers.common["Authorization"];
        this.isMenuVisible = false;
      }
    },
  },
});
