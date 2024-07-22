<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import usersCrud from "@/core/services/usersCrud";
import { createToaster } from "@meforma/vue-toaster";

const isLoading = ref(false);
const toaster = createToaster();

const userData = ref<any[]>([]);
const firstNames = ref<Record<string, number>>({});
const lastNames = ref<Record<string, number>>({});

const getData = () => {
  isLoading.value = true;
  usersCrud.getUsers({ page: 1, per_page: 9999999 })
    .then((response) => {
      const users = response.data.data;
      userData.value = users;

      updateFirstNames(users);
      updateLastNames(users);
      updateBarChart(users);
      updatePieChartByFirstName();
      updatePieChartByLastName();

      console.log(firstNames);
    })
    .catch(() => {
      toaster.error('Falha ao carregar os usuários.');
    })
    .finally(() => { isLoading.value = false; });
}

const updateFirstNames = (users: any[]) => {
  firstNames.value = users.reduce((acc, user) => {
    acc[user.first_name] = (acc[user.first_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

const updateLastNames = (users: any[]) => {
  lastNames.value = users.reduce((acc, user) => {
    acc[user.last_name] = (acc[user.last_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

const updateBarChart = (users: any[]) => {
  chartOptions1.value.series[0].data = [users.length];
}

const updatePieChartByFirstName = () => {
  chartOptions2.value = {
    chart: {
      type: 'pie'
    },
    series: Object.values(firstNames.value),
    labels: Object.keys(firstNames.value),
    title: {
      text: 'Distribuição de Nomes',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333'
      }
    }
  };
};

const updatePieChartByLastName = () => {
  chartOptions3.value = {
    chart: {
      type: 'pie'
    },
    series: Object.values(lastNames.value),
    labels: Object.keys(lastNames.value),
    title: {
      text: 'Distribuição de Sobrenomes',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333'
      }
    }
  };
};

const chartOptions1 = ref({
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'Total de Usuários',
    data: [0]
  }],
  xaxis: {
    categories: ['Total de Usuários']
  },
  title: {
    text: 'Total de Usuários',
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333'
    }
  }
});

const chartOptions2 = ref<{
  chart: {
    type: 'pie';
  };
  series: number[];
  labels: string[];
  title: {
    text: string;
    align: string;
    style: {
      fontSize: string;
      fontWeight: string;
      color: string;
    }
  };
}>({
  chart: {
    type: 'pie'
  },
  series: [],
  labels: [],
  title: {
    text: 'Distribuição de Nomes',
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333'
    }
  }
});

const chartOptions3 = ref<{
  chart: {
    type: 'pie';
  };
  series: number[];
  labels: string[];
  title: {
    text: string;
    align: string;
    style: {
      fontSize: string;
      fontWeight: string;
      color: string;
    }
  };
}>({
  chart: {
    type: 'pie'
  },
  series: [],
  labels: [],
  title: {
    text: 'Distribuição de Sobrenomes',
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333'
    }
  }
});

onMounted(() => {
  getData();
});

</script>


<template>
  <div class="">
    <div class="w-full max-w-md">
      <apexchart
        width="500"
        type="bar"
        :options="chartOptions1"
        :series="chartOptions1.series"
      ></apexchart>
    </div>
    <div class="w-full max-w-md">
      <apexchart
        width="500"
        type="pie"
        :options="chartOptions2"
        :series="chartOptions2.series"
        :labels="chartOptions2.labels"
      ></apexchart>
    </div>
    <div class="w-full max-w-md">
      <apexchart
        width="500"
        type="pie"
        :options="chartOptions3"
        :series="chartOptions3.series"
        :labels="chartOptions3.labels"
      ></apexchart>
    </div>
  </div>
</template>