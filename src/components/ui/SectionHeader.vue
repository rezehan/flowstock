<template>
  <div class="mb-4 flex items-end justify-between gap-3">
    <div>
      <h2 class="text-base font-bold leading-tight" style="color:var(--c-text-1);">{{ title }}</h2>
      <p v-if="subtitle" class="mt-1 text-xs" style="color:var(--c-text-2);">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="flex flex-shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title:    { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>
