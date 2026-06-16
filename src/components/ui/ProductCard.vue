<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-[18px] border cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[var(--c-accent-glow)]"
    style="background:var(--c-surface); border-color:var(--c-border);"
    @click="$emit('click')"
  >
    <!-- Stock badge top-right -->
    <div class="absolute right-3 top-3 z-[2]">
      <Badge :variant="stockVariant">
        {{ stok <= 0 ? 'Habis' : stok < 80 ? 'Stok Tipis' : 'Tersedia' }}
      </Badge>
    </div>

    <!-- Emoji gambar -->
    <div class="relative flex h-[120px] items-center justify-center border-b"
         style="background:var(--c-surface-2); border-color:var(--c-border-soft);">
      <span class="text-[52px] leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:scale-110">
        {{ gambar }}
      </span>
    </div>

    <!-- Info -->
    <div class="flex flex-1 flex-col gap-1 px-4 pb-2.5 pt-3.5">
      <div class="text-[10px] font-semibold uppercase tracking-wider" style="color:var(--c-accent);">{{ kategori }}</div>
      <div class="text-sm font-bold leading-snug" style="color:var(--c-text-1);">{{ nama }}</div>
      <div class="mt-1 font-mono text-[15px] font-bold" style="color:var(--c-green);">
        Rp {{ harga.toLocaleString('id-ID') }}
        <span class="font-sans text-[11px] font-normal" style="color:var(--c-text-3);">/ {{ satuan }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-4 pb-3.5 pt-2.5">
      <div class="flex items-center gap-1.5 text-xs" style="color:var(--c-text-2);">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        </svg>
        {{ stok }} {{ satuan }}
      </div>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-[10px] text-white transition-all duration-150 enabled:hover:scale-110 enabled:hover:shadow-[0_4px_12px_rgba(79,127,255,0.4)] disabled:cursor-not-allowed disabled:shadow-none disabled:bg-[var(--c-border)]"
        style="background:var(--c-accent); box-shadow:0 2px 8px var(--c-accent-glow);"
        :disabled="stok <= 0"
        @click.stop="$emit('add-to-cart')"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Badge from './Badge.vue'

const props = defineProps({
  id:       { type: Number, required: true },
  nama:     { type: String, required: true },
  kategori: { type: String, required: true },
  harga:    { type: Number, required: true },
  stok:     { type: Number, required: true },
  satuan:   { type: String, required: true },
  gambar:   { type: String, required: true },
})

defineEmits(['click', 'add-to-cart'])

const stockVariant = computed(() => {
  if (props.stok <= 0)  return 'red'
  if (props.stok < 80)  return 'yellow'
  return 'green'
})
</script>
