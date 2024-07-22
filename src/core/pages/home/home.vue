<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import usersCrud from "@/core/services/usersCrud";
import { createToaster } from "@meforma/vue-toaster";

const isLoading = ref(false);
const toaster = createToaster();

const totalUsers = ref(0);

const getData = () => {
  isLoading.value = true;
  usersCrud.getUsers({ page: 1, per_page: 9999999 })
    .then((response) => {
      const users = response.data.data;
      totalUsers.value = users.length;

      chartOptions.value.series[0].data = [totalUsers.value];
    })
    .catch(() => {
      toaster.error('Falha ao carregar os usuários.');
    })
    .finally(() => { isLoading.value = false; });
}

const chartOptions = ref({
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'Total de Usuários',
    data: [0]
  }],
  xaxis: {
    categories: ['Total de Usuários']
  }
});

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="chartOptions.series"
    ></apexchart>
  </div>
</template>