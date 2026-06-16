<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="product"
        class="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
        @click.self="$emit('close')">
        <div class="modal-box bg-white relative w-full max-w-[460px] overflow-hidden rounded-3xl border shadow-2xl"
          style="border-color:var(--c-border);">

          <!-- Close btn -->
          <button
            class="absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-[10px] border transition-all duration-150 hover:border-[var(--c-accent)]"
            style="background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-2);"
            @click="$emit('close')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Hero image -->
          <div class="relative flex h-40 items-center justify-center overflow-hidden border-b"
            style="background:var(--c-surface-2); border-color:var(--c-border-soft);">
            <span class="relative z-[2] text-[80px] leading-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">{{
              product.gambar }}</span>
            <div class="absolute inset-0"
              style="background:radial-gradient(circle at center, var(--c-accent-dim) 0%, transparent 70%);"></div>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-3 p-6 pt-5">
            <div class="flex flex-wrap gap-1.5">
              <Badge variant="blue">{{ product.kategori }}</Badge>
              <Badge :variant="stockVariant">{{ stockLabel }}</Badge>
            </div>

            <h2 class="text-xl font-extrabold leading-tight" style="color:var(--c-text-1);">{{ product.nama }}</h2>
            <p class="text-[13px] leading-relaxed" style="color:var(--c-text-2);">{{ product.deskripsi }}</p>

            <div class="h-px" style="background:var(--c-border-soft);"></div>

            <!-- Info grid -->
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1">
                <span class="text-[11px] font-semibold uppercase tracking-wider"
                  style="color:var(--c-text-3);">Harga</span>
                <span class="font-mono text-sm font-bold" style="color:var(--c-green);">
                  Rp {{ product.harga.toLocaleString('id-ID') }} / {{ product.satuan }}
                </span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:var(--c-text-3);">Stok
                  Tersedia</span>
                <span class="font-mono text-sm font-bold"
                  :style="{ color: stockVariant === 'red' ? 'var(--c-red)' : stockVariant === 'yellow' ? 'var(--c-yellow)' : 'var(--c-text-1)' }">
                  {{ product.stok }} {{ product.satuan }}
                </span>
              </div>
            </div>

            <div class="h-px" style="background:var(--c-border-soft);"></div>

            <!-- Qty + Add to cart -->
            <div class="flex flex-wrap items-center gap-2.5">
              <div class="flex flex-shrink-0 items-center overflow-hidden rounded-xl border"
                style="background:var(--c-surface-2); border-color:var(--c-border);">
                <button
                  class="flex h-9 w-9 items-center justify-center transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-35 enabled:hover:bg-[var(--c-border)]"
                  style="color:var(--c-text-2);" :disabled="qty <= 1" @click="qty > 1 ? qty-- : null">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span class="border-x font-mono text-sm font-bold leading-9 min-w-9 text-center"
                  style="color:var(--c-text-1); border-color:var(--c-border);">{{ qty }}</span>
                <button
                  class="flex h-9 w-9 items-center justify-center transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-35 enabled:hover:bg-[var(--c-border)]"
                  style="color:var(--c-text-2);" :disabled="qty >= product.stok"
                  @click="qty < product.stok ? qty++ : null">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>

              <div class="flex-1 text-right font-mono text-[15px] font-bold" style="color:var(--c-green);">
                Rp {{ (product.harga * qty).toLocaleString('id-ID') }}
              </div>

              <button
                class="flex bg-black w-full items-center justify-center gap-2 rounded-xl px-4.5 py-2.5 text-[13px] font-bold text-white transition-all duration-150 disabled:cursor-not-allowed disabled:shadow-none enabled:hover:-translate-y-px"
                style="box-shadow:0 4px 12px var(--c-accent-glow);" :disabled="product.stok <= 0" @click="handleAdd">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
                {{ added ? '✓ Ditambahkan!' : 'Tambah ke Keranjang' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Badge from '../ui/Badge.vue'

const props = defineProps({
  product: { type: Object, default: null },
})
const emit = defineEmits(['close', 'add-to-cart'])

const qty = ref(1)
const added = ref(false)

watch(() => props.product, () => { qty.value = 1; added.value = false })

const stockVariant = computed(() => {
  if (!props.product) return 'gray'
  if (props.product.stok <= 0) return 'red'
  if (props.product.stok < 80) return 'yellow'
  return 'green'
})
const stockLabel = computed(() => {
  if (!props.product) return ''
  if (props.product.stok <= 0) return 'Habis'
  if (props.product.stok < 80) return 'Stok Tipis'
  return 'Tersedia'
})

function handleAdd() {
  emit('add-to-cart', { productId: props.product.id, qty: qty.value })
  added.value = true
  setTimeout(() => { added.value = false }, 1800)
}
</script>

<style scoped>
/* Modal enter/leave transition */
.modal-enter-active {
  transition: all 0.2s ease;
}

.modal-leave-active {
  transition: all 0.15s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-box {
  transform: scale(0.95) translateY(10px);
}

.modal-leave-to .modal-box {
  transform: scale(0.97);
}
</style>
