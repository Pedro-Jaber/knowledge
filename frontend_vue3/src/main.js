import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./config/router";
import App from "./App.vue";
import Toast from "vue-toastification";

// TEMPORAIO!
import axios from "axios";
axios.default.defaults.headers.common["Authorization"] =
  "Bearer " +
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlBlZHJvIEphYmVyIiwiZW1haWwiOiJwZWRyb2phYmVyY0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzU4Mzk4MjczLCJleHAiOjE3NTg2NTc0NzN9.5mdoPANjd9u19ofuZgVc1DJXA8ldeCc7Ao4foSFFlKw";

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

app.use(router);
app.use(pinia);
app.use(Toast, toast_options);
app.mount("#app");
