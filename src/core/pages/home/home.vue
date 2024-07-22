<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import usersCrud from "@/core/services/usersCrud";
import { createToaster } from "@meforma/vue-toaster";
const msg = 'Home Page';

const isLoading = ref(false);
const toaster = createToaster();

const currentPage = ref(1);
const resultsPerPage = ref(9999999);

const getData = () => {
  isLoading.value = true;
  usersCrud.getUsers({ page : currentPage.value, per_page : resultsPerPage.value })
    .then((response) => {
        console.log(response.data.data);
    })
    .catch(() => {
        toaster.error('Falha ao carregar os usuários.');
    })
    .finally(() => {isLoading.value = false});
}

onMounted(() => {
  getData();
});

</script>

<template>
  <div class="flex justify-center items-center h-screen w-screen" >
    <h1 class="bg-gray-400 p-2 border rounded-2xl" >
      {{ msg }}
    </h1>
  </div>
</template>