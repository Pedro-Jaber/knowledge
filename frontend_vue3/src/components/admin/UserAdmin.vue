<template>
  <div class="user-admin">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
          <th scope="col">Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin ? "Sim" : "Não" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { baseUrl } from "@/global";
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

let mode = ref("save");
let user = reactive({});
let users = ref([]);

const loadUsers = async () => {
  const url = `${baseUrl}/users`;
  axios.get(url).then((res) => {
    users.value = res.data;
    // console.log("users:", users.value);
  });
};

onMounted(() => {
  loadUsers();
});
</script>

<style></style>
