<template>
  <div class="relative flex flex-col gap-3 overflow-hidden rounded-[18px] border p-5 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
       style="background:var(--c-surface); border-color:var(--c-border);">

    <!-- Gradient overlay -->
    <div class="pointer-events-none absolute inset-0 rounded-[18px]"
         :style="{ background: `linear-gradient(135deg, ${accentDim} 0%, transparent 60%)` }"></div>

    <!-- Glow blob -->
    <div class="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-[0.07] blur-xl"
         :style="{ background: accentColor }"></div>

    <!-- Top row -->
    <div class="relative z-10 flex items-center justify-between">
      <div class="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl border"
           :style="{ background: accentDim, borderColor: accentBorder, color: accentColor }"
           v-html="icon"></div>
      <div v-if="trend !== undefined"
           class="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
           :style="{ background: accentDim, color: accentColor }">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline v-if="trend >= 0" points="18 15 12 9 6 15"/>
          <polyline v-else points="6 9 12 15 18 9"/>
        </svg>
        {{ Math.abs(trend) }}%
      </div>
    </div>

    <!-- Value & label -->
    <div class="relative z-10 flex flex-col gap-1">
      <div class="text-[22px] font-medium leading-none tracking-tight" style="font-family:var(--f-mono); color:var(--c-text-1);">
        {{ formattedValue }}
      </div>
      <div class="text-xs font-medium" style="color:var(--c-text-2);">{{ label }}</div>
    </div>

    <!-- Sub -->
    <div v-if="sub" class="relative z-10 border-t pt-2 text-[11px]" style="color:var(--c-text-3); border-color:var(--c-border-soft);">
      {{ sub }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label:  { type: String,           required: true },
  value:  { type: [Number, String], required: true },
  icon:   { type: String,           default: '' },
  trend:  { type: Number,           default: undefined },
  sub:    { type: String,           default: '' },
  accent: { type: String,           default: 'blue' }, // blue | green | yellow | purple | red
  format: { type: String,           default: 'number' },
})

const formattedValue = computed(() => {
  if (props.format === 'currency') return 'Rp ' + Number(props.value).toLocaleString('id-ID')
  if (props.format === 'number')   return Number(props.value).toLocaleString('id-ID')
  return props.value
})

const accentMap = {
  blue:   { color: 'var(--c-accent)', dim: 'var(--c-accent-dim)', border: 'var(--c-accent-glow)' },
  green:  { color: 'var(--c-green)',  dim: 'var(--c-green-dim)',  border: 'rgba(52,211,153,0.25)' },
  yellow: { color: 'var(--c-yellow)', dim: 'var(--c-yellow-dim)', border: 'rgba(251,191,36,0.25)' },
  purple: { color: 'var(--c-purple)', dim: 'var(--c-purple-dim)', border: 'rgba(167,139,250,0.25)' },
  red:    { color: 'var(--c-red)',    dim: 'var(--c-red-dim)',    border: 'rgba(248,113,113,0.25)' },
}

const accentColor  = computed(() => (accentMap[props.accent] || accentMap.blue).color)
const accentDim    = computed(() => (accentMap[props.accent] || accentMap.blue).dim)
const accentBorder = computed(() => (accentMap[props.accent] || accentMap.blue).border)
</script>
