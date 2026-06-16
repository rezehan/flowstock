<template>
  <Transition name="fab">
    <button
      v-if="count > 0"
      class="fixed bottom-7 right-8 z-[150] flex items-center gap-3 rounded-[18px] py-3 pl-3.5 pr-5 text-white transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(79,127,255,0.5)]"
      style="background:var(--c-accent); box-shadow:0 12px 32px rgba(79,127,255,0.4);"
      @click="$emit('click')"
    >
      <div class="relative flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        <span class="absolute -right-2.5 -top-2.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 px-1 text-[10px] font-extrabold"
              style="background:var(--c-red); border-color:var(--c-surface);">
          {{ count }}
        </span>
      </div>
      <div class="flex flex-col items-start leading-tight">
        <span class="text-[11px] font-medium opacity-85">Keranjang</span>
        <span class="font-mono text-sm font-extrabold">Rp {{ total.toLocaleString('id-ID') }}</span>
      </div>
    </button>
  </Transition>
</template>

<script setup>
defineProps({
  count: { type: Number, required: true },
  total: { type: Number, required: true },
})
defineEmits(['click'])
</script>

<style scoped>
.fab-enter-active, .fab-leave-active { transition: all 0.25s ease; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateY(20px) scale(0.9); }
</style>
