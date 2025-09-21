import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./config/router";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

// TEMPORAIO!
import axios from "axios";
axios.default.defaults.headers.common["Authorization"] =
  "Bearer " +
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlBlZHJvIEphYmVyIiwiZW1haWwiOiJwZWRyb2phYmVyY0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzU4Mzk4MjczLCJleHAiOjE3NTg2NTc0NzN9.5mdoPANjd9u19ofuZgVc1DJXA8ldeCc7Ao4foSFFlKw";

app.use(router);
app.use(pinia);
app.mount("#app");
