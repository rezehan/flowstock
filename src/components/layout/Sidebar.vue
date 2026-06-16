<template>
  <aside class="fixed left-0 top-0 bottom-0 w-[240px] flex flex-col z-50 border-r py-5"
    style="background:var(--c-surface); border-color:var(--c-border);">

    <!-- Brand -->
    <div class="flex items-center gap-3 px-5 pb-6 border-b" style="border-color:var(--c-border-soft);">
      <div class="w-[38px] h-[38px] rounded-xl flex items-center justify-center flex-shrink-0 border"
        style="background:var(--c-accent-dim); border-color:var(--c-accent-glow); color:var(--c-accent);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      </div>
      <div class="flex flex-col leading-tight">
        <span class="text-[15px] font-bold" style="color:var(--c-text-1);">TokoKu</span>
        <span class="text-[10px] uppercase tracking-widest" style="color:var(--c-text-3);">Manajemen Toko</span>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 flex flex-col px-3 pt-5">
      <span class="text-[10px] font-semibold tracking-widest px-2 mb-3" style="color:var(--c-text-3);">MENU</span>
      <div class="flex flex-col gap-1">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative"
          :class="$route.path === item.to ? 'nav-active' : 'nav-idle'">
          <span class="flex items-center flex-shrink-0" v-html="item.icon"></span>
          <span class="flex-1">{{ item.label }}</span>
          <span v-if="item.badge"
            class="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white min-w-[18px] text-center"
            style="background:var(--c-red);">
            {{ item.badge }}
          </span>
        </RouterLink>
      </div>
    </nav>

    <!-- User -->
    <!-- <div class="px-3 pt-4 border-t" style="border-color:var(--c-border-soft);">
      <div class="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl" style="background:var(--c-surface-2);">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style="background:var(--c-accent);">AD</div>
        <div class="flex-1 flex flex-col leading-tight">
          <span class="text-[13px] font-semibold" style="color:var(--c-text-1);">Admin Toko</span>
          <span class="text-[11px]" style="color:var(--c-text-3);">Administrator</span>
        </div>
        <div class="w-2 h-2 rounded-full flex-shrink-0"
          style="background:var(--c-green); box-shadow:0 0 6px var(--c-green);"></div>
      </div>
    </div> -->
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useDataStore } from '../../stores/useDataStore.js'

const store = useDataStore()

const navItems = computed(() => [
  {
    to: '/dashboard', label: 'Dashboard',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  },
  {
    to: '/katalog', label: 'Katalog',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  },
  {
    to: '/pembelian', label: 'Pembelian',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
  },
])
</script>

<style scoped>
.nav-idle {
  color: var(--c-text-2);
}

.nav-idle:hover {
  background: var(--c-surface-2);
  color: var(--c-text-1);
}

.nav-active {
  background: var(--c-accent-dim);
  color: var(--c-accent);
  border: 1px solid rgba(79, 127, 255, 0.18);
}
</style>
