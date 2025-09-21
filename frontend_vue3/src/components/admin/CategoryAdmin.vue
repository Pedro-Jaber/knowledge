<template>
  <div class="category-admin">
    <form>
      <input id="category-id" type="hidden" v-model="category.id" />

      <!-- Nome e Categoria Pai -->
      <div class="row">
        <!-- Nome -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="category-name">Nome</label>
            <input
              id="category-name"
              type="text"
              class="form-control"
              placeholder="Informe o nome do usuário"
              v-model="category.name"
              required
              :disabled="mode === 'remove'"
            />
          </div>
        </div>

        <!-- Path -->
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="category-parentId">Path</label>
            <select
              id="category-parentId"
              class="form-select"
              v-model="category.parentId"
              aria-label=""
              required
              :disabled="mode === 'remove'"
            >
              <option selected :value="null">Sem Pai</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.path }}
              </option>
            </select>
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
          <th scope="col">Caminho</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.id }}</th>
          <td>{{ category.name }}</td>
          <td>{{ category.path }}</td>
          <td>
            <button type="button" class="btn btn-warning" @click="loadCategory(category, 'save')">
              <i class="fa fa-pencil"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger ms-2"
              @click="loadCategory(category, 'remove')"
            >
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

const emptyCategory = () => ({
  name: "",
  parentId: null,
});

let mode = ref("save");
let category = reactive(emptyCategory());
let categories = ref([]);

const loadCategories = () => {
  const url = `${baseUrl}/categories`;
  axios.get(url).then((res) => {
    categories.value = res.data;
    // console.log("categories:", categories.value);
  });
};

const loadCategory = (_category, _mode = "save") => {
  mode.value = _mode;
  Object.assign(category, { ..._category });
  console.log("category:", category);
};

const reset = () => {
  mode.value = "save";
  Object.assign(category, emptyCategory());
  delete category.id;
  loadCategories();
};

const save = () => {
  const method = category.id ? "put" : "post";
  const id = category.id ? `/${category.id}` : "";
  axios[method](`${baseUrl}/categories${id}`, { name: category.name, parentId: category.parentId })
    .then(() => {
      showSuccess("Categoria salvo com sucesso!");
      reset();
    })
    .catch(showError);
};

const remove = () => {
  const id = category.id;
  axios
    .delete(`${baseUrl}/categories/${id}`)
    .then(() => {
      showSuccess("Categoria removido com sucesso!");
      reset();
    })
    .catch(showError);
};

onMounted(() => {
  loadCategories();
});
</script>

<style></style>
