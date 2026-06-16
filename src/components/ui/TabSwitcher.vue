<template>
  <div class="flex gap-0.5 rounded-xl border p-[3px]" style="background:var(--c-surface-2); border-color:var(--c-border);">
    <button
      v-for="tab in tabs" :key="tab.value"
      class="rounded-[9px] px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-150"
      :style="modelValue === tab.value
        ? 'background:var(--c-accent); color:white; box-shadow:0 2px 8px rgba(79,127,255,0.35);'
        : 'color:var(--c-text-2);'"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs:       { type: Array,            required: true },
  modelValue: { type: [String, Number], required: true },
})
defineEmits(['update:modelValue'])
</script>
