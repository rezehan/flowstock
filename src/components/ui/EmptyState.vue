<template>
  <div class="flex flex-col items-center justify-center gap-2.5 px-6 py-14 text-center">
    <div class="text-5xl leading-none">{{ icon }}</div>
    <div class="mt-1 text-base font-bold" style="color:var(--c-text-1);">{{ title }}</div>
    <div class="max-w-[280px] text-[13px] leading-relaxed" style="color:var(--c-text-2);">{{ description }}</div>
    <slot name="action" />
  </div>
</template>

<script setup>
defineProps({
  icon:        { type: String, default: '🔍' },
  title:       { type: String, default: 'Tidak ditemukan' },
  description: { type: String, default: 'Coba ubah kata kunci pencarian.' },
})
</script>
