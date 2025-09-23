<script setup>
import { computed } from "vue";

const props = defineProps({
  totalItems: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
  modelValue: { type: Number, default: 1 },
});

const emit = defineEmits(["update:modelValue"]);

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  const current = props.modelValue;
  const last = totalPages.value;

  if (last <= maxVisible) {
    // Se tiver poucas páginas, mostra todas
    for (let i = 1; i <= last; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1); // primeira sempre

    let start = Math.max(2, current - 2);
    let end = Math.min(last - 1, current + 2);

    // Ajusta para sempre mostrar 5 no meio
    if (current <= 2) {
      end = 1 + (maxVisible - 2);
    } else if (current >= last - 2) {
      start = last - (maxVisible - 2);
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < last - 1) {
      pages.push("...");
    }

    pages.push(last); // última sempre
  }

  return pages;
});

const changePage = (page) => {
  if (page === "..." || page < 1 || page > totalPages.value) return;
  emit("update:modelValue", page);
};
</script>

<template>
  <nav v-if="totalPages > 1">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: modelValue === 1 }">
        <button class="page-link" @click="changePage(modelValue - 1)">Anterior</button>
      </li>

      <li
        v-for="page in visiblePages"
        :key="page + '-' + Math.random()"
        class="page-item"
        :class="{ active: modelValue === page }"
      >
        <button v-if="page !== '...'" class="page-link" @click="changePage(page)">
          {{ page }}
        </button>
        <span v-else class="page-link disabled">...</span>
      </li>

      <li class="page-item" :class="{ disabled: modelValue === totalPages }">
        <button class="page-link" @click="changePage(modelValue + 1)">Próximo</button>
      </li>
    </ul>
  </nav>
</template>
