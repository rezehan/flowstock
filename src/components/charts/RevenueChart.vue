<template>
  <div class="chart-wrapper">
    <Bar v-if="chartType === 'bar'" :data="chartData" :options="chartOptions" />
    <Line v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, LineElement, PointElement,
  Tooltip, Legend, Filler,
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale, LinearScale,
  BarElement, LineElement, PointElement,
  Tooltip, Legend, Filler,
)

const props = defineProps({
  labels:    { type: Array,  required: true },
  values:    { type: Array,  required: true },
  chartType: { type: String, default: 'bar' },  // 'bar' | 'line'
  label:     { type: String, default: 'Omset' },
  color:     { type: String, default: '#4f7fff' },
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.label,
      data: props.values,
      backgroundColor: props.chartType === 'bar'
        ? `${props.color}55`
        : `${props.color}22`,
      borderColor: props.color,
      borderWidth: props.chartType === 'bar' ? 0 : 2.5,
      borderRadius: props.chartType === 'bar' ? 6 : 0,
      borderSkipped: false,
      fill: props.chartType === 'line',
      tension: 0.4,
      pointBackgroundColor: props.color,
      pointBorderColor: '#181c27',
      pointBorderWidth: 2,
      pointRadius: props.chartType === 'line' ? 4 : 0,
      pointHoverRadius: 6,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1f2435',
      borderColor: '#2a3047',
      borderWidth: 1,
      padding: 12,
      titleColor: '#eef0f8',
      bodyColor: '#7d88a8',
      titleFont: { family: 'Plus Jakarta Sans', size: 13, weight: '600' },
      bodyFont:  { family: 'JetBrains Mono', size: 12 },
      callbacks: {
        label: (ctx) => ' Rp ' + Number(ctx.raw).toLocaleString('id-ID'),
      },
    },
  },
  scales: {
    x: {
      grid: { color: '#2a304730', drawBorder: false },
      ticks: {
        color: '#7d88a8',
        font: { family: 'Plus Jakarta Sans', size: 11 },
      },
      border: { display: false },
    },
    y: {
      grid: { color: '#2a304750', drawBorder: false },
      ticks: {
        color: '#7d88a8',
        font: { family: 'JetBrains Mono', size: 11 },
        callback: (v) => 'Rp ' + (v >= 1_000_000
          ? (v / 1_000_000).toFixed(1) + 'jt'
          : (v / 1_000).toFixed(0) + 'rb'),
      },
      border: { display: false },
    },
  },
}))
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
