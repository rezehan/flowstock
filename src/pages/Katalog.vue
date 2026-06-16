<template>
  <div class="flex flex-col gap-6 anim-fade-up">

    <!-- ── Header / Toolbar ── -->
    <div class="rounded-[18px] p-5 border" style="background:var(--c-surface); border-color:var(--c-border);">
      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <SectionHeader
          title="Katalog Produk"
          :subtitle="`${filteredProducts.length} dari ${store.products.length} produk ditemukan`"
        />
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <SearchBar v-model="searchQuery" placeholder="Cari nama produk..." class="sm:w-64" />
        </div>
      </div>

      <!-- Category tabs -->
      <div class="flex gap-2 mt-4 overflow-x-auto pb-1 -mb-1">
        <button
          v-for="cat in store.categories" :key="cat"
          @click="activeCategory = cat"
          class="cat-pill"
          :class="{ 'cat-pill-active': activeCategory === cat }"
        >
          {{ cat }}
          <span v-if="cat !== 'Semua'" class="cat-count">{{ countByCategory(cat) }}</span>
        </button>
      </div>
    </div>

    <!-- ── Sort & View toolbar ── -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold" style="color:var(--c-text-2);">Urutkan:</span>
        <TabSwitcher
          :tabs="[
            { label: 'Nama', value: 'nama' },
            { label: 'Harga Terendah', value: 'harga-asc' },
            { label: 'Harga Tertinggi', value: 'harga-desc' },
            { label: 'Stok', value: 'stok' },
          ]"
          v-model="sortBy"
        />
      </div>
      <div class="text-xs" style="color:var(--c-text-3);" v-if="store.cartCount > 0">
        🛒 {{ store.cartCount }} item di keranjang
      </div>
    </div>

    <!-- ── Product Grid ── -->
    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
        v-for="p in filteredProducts" :key="p.id"
        v-bind="p"
        @click="selectedProduct = p"
        @add-to-cart="quickAdd(p)"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="rounded-[18px] border" style="background:var(--c-surface); border-color:var(--c-border);">
      <EmptyState
        icon="📭"
        title="Produk tidak ditemukan"
        :description="`Tidak ada produk yang cocok dengan kata kunci '${searchQuery}' pada kategori '${activeCategory}'.`"
      >
        <template #action>
          <button class="reset-btn" @click="resetFilters">Reset Filter</button>
        </template>
      </EmptyState>
    </div>

    <!-- Modal -->
    <ProductModal
      :product="selectedProduct"
      @close="selectedProduct = null"
      @add-to-cart="handleAddToCart"
    />

    <!-- Floating cart -->
    <FloatingCartButton
      :count="store.cartCount"
      :total="store.cartTotal"
      @click="showCartToast"
    />

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toastMessage" class="toast">
        ✓ {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/useDataStore.js'

import SectionHeader     from '../components/ui/SectionHeader.vue'
import SearchBar          from '../components/ui/SearchBar.vue'
import TabSwitcher        from '../components/ui/TabSwitcher.vue'
import ProductCard         from '../components/ui/ProductCard.vue'
import EmptyState          from '../components/ui/EmptyState.vue'
import FloatingCartButton  from '../components/ui/FloatingCartButton.vue'
import ProductModal        from '../components/katalog/ProductModal.vue'

const store = useDataStore()

const searchQuery    = ref('')
const activeCategory = ref('Semua')
const sortBy         = ref('nama')
const selectedProduct = ref(null)
const toastMessage    = ref('')

/* ── Filtering & Sorting ── */
const filteredProducts = computed(() => {
  let list = store.products

  if (activeCategory.value !== 'Semua') {
    list = list.filter(p => p.kategori === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(p =>
      p.nama.toLowerCase().includes(q) ||
      p.kategori.toLowerCase().includes(q)
    )
  }

  list = [...list]
  switch (sortBy.value) {
    case 'harga-asc':  list.sort((a, b) => a.harga - b.harga); break
    case 'harga-desc': list.sort((a, b) => b.harga - a.harga); break
    case 'stok':       list.sort((a, b) => b.stok - a.stok); break
    default:           list.sort((a, b) => a.nama.localeCompare(b.nama))
  }

  return list
})

function countByCategory(cat) {
  return store.products.filter(p => p.kategori === cat).length
}

function resetFilters() {
  searchQuery.value = ''
  activeCategory.value = 'Semua'
}

/* ── Cart actions ── */
function quickAdd(product) {
  store.addToCart(product.id, 1)
  notify(`${product.nama} ditambahkan ke keranjang`)
}

function handleAddToCart({ productId, qty }) {
  store.addToCart(productId, qty)
  const p = store.products.find(p => p.id === productId)
  notify(`${qty}x ${p.nama} ditambahkan ke keranjang`)
}

function showCartToast() {
  notify(`Total keranjang: Rp ${store.cartTotal.toLocaleString('id-ID')}`)
}

let toastTimer = null
function notify(msg) {
  toastMessage.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMessage.value = '' }, 2200)
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

/* Category pills */
.cat-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  background: var(--c-surface-2);
  color: var(--c-text-2);
  border: 1px solid var(--c-border);
  transition: all 0.15s ease;
  flex-shrink: 0;
}
.cat-pill:hover { color: var(--c-text-1); border-color: var(--c-text-3); }
.cat-pill-active {
  background: var(--c-accent);
  color: white;
  border-color: var(--c-accent);
  box-shadow: 0 2px 10px var(--c-accent-glow);
}
.cat-count {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 99px;
  background: rgba(255,255,255,0.15);
}
.cat-pill:not(.cat-pill-active) .cat-count {
  background: var(--c-border);
  color: var(--c-text-3);
}

/* Reset button */
.reset-btn {
  margin-top: 4px;
  padding: 8px 20px;
  border-radius: 12px;
  background: var(--c-accent-dim);
  color: var(--c-accent);
  border: 1px solid var(--c-accent-glow);
  font-size: 13px;
  font-weight: 700;
  font-family: var(--f-sans);
  cursor: pointer;
  transition: all 0.15s;
}
.reset-btn:hover { background: var(--c-accent); color: white; }

/* Toast */
.toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--c-surface-2);
  border: 1px solid var(--c-green);
  color: var(--c-text-1);
  padding: 12px 24px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  z-index: 250;
  white-space: nowrap;
}
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
