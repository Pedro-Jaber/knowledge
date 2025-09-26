<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr />

      <div class="auth-title">{{ showSignup ? "Registrar" : "Login" }}</div>

      <input v-if="showSignup" type="text" placeholder="Nome" v-model="user.name" />
      <input name="email" type="email" placeholder="E-mail" v-model="user.email" />
      <input name="password" type="password" placeholder="Senha" v-model="user.password" />
      <input
        v-if="showSignup"
        type="password"
        placeholder="Confirme a Senha"
        v-model="user.confirmPassword"
      />

      <button class="btn btn-primary" v-if="!showSignup" @click="signin">Login</button>
      <button class="btn btn-primary" v-else @click="signup">Registrar</button>

      <hr />

      <span @click="showSignup = !showSignup" class="auth-switch">
        {{ showSignup ? "Ja possui uma conta?" : "Ainda nao possui uma conta?" }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { baseUrl, showError, userKey } from "@/global";
import axios from "axios";
import { reactive, ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { useStore } from "@/config/store";
import { defaultSuccess } from "@/config/msgs";
const store = useStore();

const showSignup = ref(false);
const user = reactive({});

const signin = () => {
  axios
    .post(`${baseUrl}/signin`, user)
    .then((res) => {
      store.setUser(res.data);
      localStorage.setItem(userKey, JSON.stringify(res.data));
      router.push({ name: "articles" });
    })
    .catch(showError);
};

const signup = () => {
  axios
    .post(`${baseUrl}/signup`, user)
    .then(() => {
      defaultSuccess();
      Object.assign(user, {});
      showSignup.value = false;
    })
    .catch(showError);
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 375px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}

.auth-switch {
  margin-top: 10px;
  cursor: pointer;
  color: #0d6efd;
  text-decoration: underline;
}

.auth-switch:hover {
  color: #0a58ca;
}
</style>
