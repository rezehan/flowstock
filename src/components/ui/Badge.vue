<template>
  <span class="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide"
        :class="variantClass">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'default' },
  // default | gray | blue | green | yellow | red | purple
})

const variants = {
  default: 'bg-[var(--c-surface-2)] text-[var(--c-text-2)] border-[var(--c-border)]',
  gray:    'bg-[var(--c-surface-2)] text-[var(--c-text-2)] border-[var(--c-border)]',
  blue:    'bg-[var(--c-accent-dim)] text-[var(--c-accent)] border-[var(--c-accent-glow)]',
  green:   'bg-[var(--c-green-dim)] text-[var(--c-green)] border-[rgba(52,211,153,0.2)]',
  yellow:  'bg-[var(--c-yellow-dim)] text-[var(--c-yellow)] border-[rgba(251,191,36,0.2)]',
  red:     'bg-[var(--c-red-dim)] text-[var(--c-red)] border-[rgba(248,113,113,0.2)]',
  purple:  'bg-[var(--c-purple-dim)] text-[var(--c-purple)] border-[rgba(167,139,250,0.2)]',
}

const variantClass = computed(() => variants[props.variant] || variants.default)
</script>
