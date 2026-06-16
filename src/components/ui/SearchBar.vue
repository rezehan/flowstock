<template>
  <div class="flex flex-1 items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-colors duration-150 focus-within:border-[var(--c-accent)]"
       style="background:var(--c-surface-2); border-color:var(--c-border);">
    <svg class="flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         style="color:var(--c-text-3);">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      type="text"
      class="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[var(--c-text-3)]"
      style="color:var(--c-text-1); font-family:var(--f-sans);"
    />
    <button
      v-if="modelValue"
      class="flex flex-shrink-0 items-center justify-center transition-colors duration-150 hover:text-[var(--c-text-1)]"
      style="color:var(--c-text-3);"
      @click="$emit('update:modelValue', '')"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue:  { type: String, default: '' },
  placeholder: { type: String, default: 'Cari...' },
})
defineEmits(['update:modelValue'])
</script>
