<template>
  <header class="h-[60px] flex items-center justify-between px-7 gap-4 flex-shrink-0 sticky top-0 z-40 border-b"
          style="background:var(--c-surface); border-color:var(--c-border);">

    <!-- Left -->
    <div class="flex items-baseline gap-3.5">
      <h1 class="text-[17px] font-bold" style="color:var(--c-text-1);">{{ currentPageTitle }}</h1>
      <span class="text-xs" style="color:var(--c-text-3);">{{ currentDate }}</span>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-2.5">
      <!-- Search -->
      <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-all duration-150 focus-within:border-[var(--c-accent)]"
           style="background:var(--c-surface-2); border-color:var(--c-border);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" style="color:var(--c-text-3); flex-shrink:0;">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Cari produk, transaksi..."
          class="bg-transparent border-none outline-none text-[13px] w-48"
          style="font-family:var(--f-sans); color:var(--c-text-1);"
        />
      </div>

      <!-- Notif btn -->
      <button class="relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-150 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
              style="background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-2);"
              title="Notifikasi">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
        <span class="absolute top-[7px] right-[7px] w-1.5 h-1.5 rounded-full"
              style="background:var(--c-red); box-shadow:0 0 5px var(--c-red);"></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const titles = {
  '/dashboard': 'Dashboard',
  '/katalog':   'Katalog Produk',
  '/inventory': 'Manajemen Inventory',
  '/pembelian': 'Pembelian',
}
const currentPageTitle = computed(() => titles[route.path] || 'TokoKu')
const currentDate = computed(() =>
  new Date().toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
)
</script>
