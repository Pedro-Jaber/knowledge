import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue-toastification/dist/index.css";

import "vue3-tree-vue/dist/style.css";

import "./config/axios";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./config/router";
import App from "./App.vue";
import Toast from "vue-toastification";
import { Vue3Mq } from "vue3-mq";

const app = createApp(App);
const pinia = createPinia();
const toast_options = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};
const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400,
  xxl: Infinity,
};

app.use(router);
app.use(pinia);
app.use(Toast, toast_options);
// app.use(Vue3Mq, { breakpoints, global: true });
app.use(Vue3Mq, { presets: "bootstrap5", global: true });
app.mount("#app");
