<template>
  <div class="user-admin">
    <form>
      <input id="user-id" type="hidden" v-model="user.id" />

      <!-- Nome e E-mail -->
      <div class="row">
        <!-- Nome -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="user-name">Nome</label>
            <input
              id="user-name"
              type="text"
              class="form-control"
              placeholder="Informe o nome do usuário"
              v-model="user.name"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>

        <!-- E-mail -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="user-email">E-mail</label>
            <input
              id="user-email"
              type="text"
              class="form-control"
              placeholder="Informe o e-mail do usuário"
              v-model="user.email"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>
      </div>

      <!-- Admin -->
      <div class="form-check my-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="user-admin"
          v-model="user.admin"
          :readonly="mode === 'remove'"
        />
        <label class="form-check-label" for="user-admin"> Administrador </label>
      </div>

      <!-- Senhas -->
      <div class="row">
        <!-- Senha -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="user-password">Senha:</label>
            <input
              id="user-password"
              type="password"
              class="form-control"
              placeholder="Informe a senha do usuário"
              v-model="user.password"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>

        <!-- Confirmar Senha -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="user-confirm-password">Confirmar Senha</label>
            <input
              id="user-confirm-password"
              type="password"
              class="form-control"
              placeholder="Confirme a senha do usuário"
              v-model="user.confirmPassword"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12">
          <button type="button" class="btn btn-primary" v-if="mode === 'save'" @click="save">
            Salvar
          </button>
          <button type="button" class="btn btn-danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </button>

          <button type="button" class="btn btn-secondary ms-2" @click="reset">Cancelar</button>
        </div>
      </div>
    </form>
    <hr />
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
          <th scope="col">Administrador</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin ? "Sim" : "Não" }}</td>
          <td>
            <button type="button" class="btn btn-warning" @click="loadUser(user, 'save')">
              <i class="fa fa-pencil"></i>
            </button>
            <button type="button" class="btn btn-danger ms-2" @click="loadUser(user, 'remove')">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { baseUrl, showError, showSuccess } from "@/global";
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

const emptyUser = () => ({
  name: "",
  email: "",
  admin: false,
  password: "",
  confirmPassword: "",
});

let mode = ref("save");
let user = reactive(emptyUser());
let users = ref([]);

const loadUsers = () => {
  const url = `${baseUrl}/users`;
  axios.get(url).then((res) => {
    users.value = res.data.data;
    // console.log("users:", users.value);
  });
};

const loadUser = (_user, _mode = "save") => {
  mode.value = _mode;
  Object.assign(user, { ..._user });
  // console.log("user:", user);
};

const reset = () => {
  mode.value = "save";
  Object.assign(user, emptyUser());
  delete user.id;
  loadUsers();
};

const save = () => {
  const method = user.id ? "put" : "post";
  const id = user.id ? `/${user.id}` : "";
  axios[method](`${baseUrl}/users${id}`, user)
    .then(() => {
      showSuccess("Usuário salvo com sucesso!");
      reset();
    })
    .catch(showError);
};

const remove = () => {
  const id = user.id;
  axios
    .delete(`${baseUrl}/users/${id}`)
    .then(() => {
      showSuccess("Usuário removido com sucesso!");
      reset();
    })
    .catch(showError);
};

onMounted(() => {
  loadUsers();
});
</script>

<style></style>
