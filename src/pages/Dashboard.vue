<template>
  <div class="flex flex-col gap-6 animate-fade-up">

    <!-- ── Stat Cards ── -->
    <div class="grid grid-cols-4 gap-4">
      <StatCard label="Omset Hari Ini" :value="todayData.omset" format="currency" :trend="12" accent="blue"
        :icon="iconCash" :sub="`${todayData.transaksi} transaksi hari ini`" />
      <StatCard label="Omset Bulan Ini" :value="thisMonthData.omset" format="currency" :trend="8" accent="green"
        :icon="iconChart" :sub="`${thisMonthData.transaksi} total transaksi`" />
      <StatCard label="Total Produk" :value="store.products.length" format="number" accent="purple" :icon="iconBox"
        :sub="`${store.lowStockProducts.length} produk stok menipis`" />
      <StatCard label="Omset Tahun Ini" :value="totalOmsetTahun" format="currency" :trend="5" accent="yellow"
        :icon="iconStar" :sub="`${totalTransaksiTahun.toLocaleString('id-ID')} total transaksi`" />
    </div>

    <!-- ── Main Chart ── -->
    <div class="rounded-[18px] p-6 border" style="background:var(--c-surface); border-color:var(--c-border);">
      <SectionHeader :title="'Grafik Omset'" :subtitle="activeView === 'bulanan'
        ? `Omset per bulan — ${store.currentYear}`
        : `Omset harian — ${monthName} ${store.currentYear}`">
        <template #actions>
          <select v-if="activeView === 'harian'" v-model="selectedMonth" @change="store.setMonth(Number(selectedMonth))"
            class="text-xs px-2.5 py-1.5 rounded-xl border outline-none cursor-pointer"
            style="background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-1); font-family:var(--f-sans);">
            <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
          <TabSwitcher :tabs="[{ label: 'Bar', value: 'bar' }, { label: 'Line', value: 'line' }]" v-model="chartType" />
          <TabSwitcher :tabs="[{ label: 'Harian', value: 'harian' }, { label: 'Bulanan', value: 'bulanan' }]"
            v-model="activeView" />
        </template>
      </SectionHeader>

      <!-- Chart -->
      <div class="h-[280px] w-full mt-2">
        <RevenueChart :labels="chartLabels" :values="chartValues" :chart-type="chartType" label="Omset" />
      </div>

      <!-- Summary pills -->
      <div class="flex gap-3 mt-5 pt-4 border-t flex-wrap" style="border-color:var(--c-border-soft);">
        <div v-for="pill in summaryPills" :key="pill.label"
          class="flex flex-col gap-0.5 px-4 py-2 rounded-xl border flex-1 min-w-[110px]"
          style="background:var(--c-surface-2); border-color:var(--c-border-soft);">
          <span class="text-[10px] font-semibold uppercase tracking-wider" style="color:var(--c-text-3);">{{ pill.label
            }}</span>
          <span class="text-[13px] font-medium"
            :style="pill.accent ? 'color:var(--c-accent);' : 'color:var(--c-text-1);'"
            style="font-family:var(--f-mono);">
            Rp {{ pill.value.toLocaleString('id-ID') }}
          </span>
        </div>
      </div>
    </div>

    <!-- ── Bottom Row ── -->
    <div class="grid gap-4" style="grid-template-columns: 1fr 380px;">

      <!-- Top Produk -->
      <div class="rounded-[18px] p-6 border" style="background:var(--c-surface); border-color:var(--c-border);">
        <SectionHeader title="Produk Terlaris" subtitle="Berdasarkan estimasi penjualan bulan ini" />
        <div class="flex flex-col gap-0.5">
          <div v-for="(p, i) in store.topProducts" :key="p.id"
            class="flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors duration-150 hover:bg-[var(--c-surface-2)]">
            <!-- Rank -->
            <span class="text-[11px] font-bold w-6 flex-shrink-0 font-mono"
              :style="i === 0 ? 'color:var(--c-yellow)' : i === 1 ? 'color:var(--c-text-2)' : i === 2 ? 'color:#cd7f32' : 'color:var(--c-text-3)'">
              #{{ i + 1 }}
            </span>
            <span class="text-xl w-8 text-center flex-shrink-0">{{ p.gambar }}</span>
            <div class="flex-1 flex flex-col gap-0.5 min-w-0">
              <span class="text-[13px] font-semibold truncate" style="color:var(--c-text-1);">{{ p.nama }}</span>
              <span class="text-[11px]" style="color:var(--c-text-3);">{{ p.kategori }}</span>
            </div>
            <div class="flex flex-col items-end gap-1 min-w-[90px]">
              <span class="text-xs" style="font-family:var(--f-mono); color:var(--c-text-1);">
                Rp {{ (p.revenue / 1_000_000).toFixed(2) }}jt
              </span>
              <div class="w-20 h-1 rounded-full overflow-hidden" style="background:var(--c-surface-2);">
                <div class="h-full rounded-full transition-all duration-500" style="background:var(--c-accent);"
                  :style="{ width: barWidth(p.revenue) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stok Menipis -->
      <div class="rounded-[18px] p-6 border" style="background:var(--c-surface); border-color:var(--c-border);">
        <SectionHeader title="⚠️ Stok Menipis" subtitle="Produk yang perlu segera direstok" />
        <div class="flex flex-col gap-2">
          <div v-if="store.lowStockProducts.length === 0" class="text-center py-6 text-sm"
            style="color:var(--c-text-2);">
            ✅ Semua stok aman
          </div>
          <div v-for="p in store.lowStockProducts" :key="p.id" class="flex items-center gap-2.5 p-2.5 rounded-xl border"
            style="background:var(--c-surface-2); border-color:var(--c-border-soft);">
            <span class="text-xl flex-shrink-0">{{ p.gambar }}</span>
            <div class="flex-1 flex flex-col gap-1.5 min-w-0">
              <span class="text-[13px] font-semibold truncate" style="color:var(--c-text-1);">{{ p.nama }}</span>
              <div class="h-1 rounded-full overflow-hidden" style="background:var(--c-surface);">
                <div class="h-full rounded-full transition-all duration-500"
                  :style="{ width: stockBarWidth(p.stok) + '%', background: stockColor(p.stok) }"></div>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <div class="text-[13px] font-bold" style="font-family:var(--f-mono);"
                :style="{ color: stockColor(p.stok) }">{{
                p.stok }}</div>
              <div class="text-[10px]" style="color:var(--c-text-3);">{{ p.satuan }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/useDataStore.js'
import StatCard from '../components/ui/StatCard.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import TabSwitcher from '../components/ui/TabSwitcher.vue'
import RevenueChart from '../components/charts/RevenueChart.vue'

const store = useDataStore()

const activeView = ref('bulanan')
const chartType = ref('bar')
const selectedMonth = ref(store.currentMonth)

const months = [
  { label: 'Januari', value: 1 }, { label: 'Februari', value: 2 }, { label: 'Maret', value: 3 },
  { label: 'April', value: 4 }, { label: 'Mei', value: 5 }, { label: 'Juni', value: 6 },
  { label: 'Juli', value: 7 }, { label: 'Agustus', value: 8 }, { label: 'September', value: 9 },
  { label: 'Oktober', value: 10 }, { label: 'November', value: 11 }, { label: 'Desember', value: 12 },
]
const monthName = computed(() => months.find(m => m.value === selectedMonth.value)?.label || '')

const chartLabels = computed(() => {
  if (activeView.value === 'bulanan') return store.monthlyData.map(m => m.label)
  return store.getDailyData(selectedMonth.value).map(d => String(new Date(d.date).getDate()))
})
const chartValues = computed(() => {
  if (activeView.value === 'bulanan') return store.monthlyData.map(m => m.omset)
  return store.getDailyData(selectedMonth.value).map(d => d.omset)
})

const chartTotal = computed(() => chartValues.value.reduce((a, b) => a + b, 0))
const chartAvg = computed(() => Math.round(chartTotal.value / (chartValues.value.length || 1)))
const chartMax = computed(() => Math.max(...chartValues.value))
const chartMin = computed(() => Math.min(...chartValues.value))

const summaryPills = computed(() => [
  { label: 'Total', value: chartTotal.value },
  { label: 'Rata-rata', value: chartAvg.value },
  { label: 'Tertinggi', value: chartMax.value, accent: true },
  { label: 'Terendah', value: chartMin.value },
])

const { todayData, thisMonthData, totalOmsetTahun, totalTransaksiTahun } = store

const maxRevenue = computed(() => Math.max(...store.topProducts.map(p => p.revenue)))
function barWidth(rev) { return Math.round((rev / maxRevenue.value) * 100) }
function stockColor(stok) {
  if (stok < 30) return 'var(--c-red)'
  if (stok < 60) return 'var(--c-yellow)'
  return 'var(--c-green)'
}
function stockBarWidth(stok) { return Math.min(Math.round((stok / 80) * 100), 100) }

const iconCash = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`
const iconChart = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`
const iconBox = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`
const iconStar = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
</script>
