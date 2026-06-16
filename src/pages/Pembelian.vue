<template>
  <div class="flex flex-col gap-6 anim-fade-up">

    <!-- ── Header ── -->
    <div class="rounded-[18px] p-5 border" style="background:var(--c-surface); border-color:var(--c-border);">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <SectionHeader
          title="Halaman Pembelian"
          :subtitle="`${store.cartCount} item di keranjang · Total: Rp ${store.cartTotal.toLocaleString('id-ID')}`"
        />
        <div class="flex gap-2">
          <button
            v-if="store.cartCount > 0"
            @click="clearCartConfirm"
            class="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-150 hover:border-[var(--c-red)] hover:text-[var(--c-red)]"
            style="border-color:var(--c-border); color:var(--c-text-2); background:var(--c-surface-2);"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
            Kosongkan
          </button>
          <TabSwitcher
            :tabs="[{ label: 'Keranjang', value: 'cart' }, { label: 'Riwayat', value: 'history' }]"
            v-model="activeTab"
          />
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════════ TAB: KERANJANG ════════════════════════════════════ -->
    <div v-if="activeTab === 'cart'" class="flex flex-col gap-6">

      <!-- Empty cart -->
      <div v-if="store.cartCount === 0"
           class="rounded-[18px] border py-16"
           style="background:var(--c-surface); border-color:var(--c-border);">
        <div class="flex flex-col items-center gap-4 text-center px-6">
          <div class="text-6xl">🛒</div>
          <div>
            <h3 class="text-[15px] font-bold" style="color:var(--c-text-1);">Keranjang Kosong</h3>
            <p class="mt-1 text-xs leading-relaxed max-w-xs" style="color:var(--c-text-2);">
              Tambahkan produk dari halaman Katalog untuk memulai pembelian.
            </p>
          </div>
          <router-link to="/katalog"
            class="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all duration-150 hover:opacity-90 hover:shadow-[0_4px_16px_var(--c-accent-glow)]"
            style="background:var(--c-accent);">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Ke Katalog
          </router-link>
        </div>
      </div>

      <!-- Cart items + checkout -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT: Cart items -->
        <div class="lg:col-span-2 flex flex-col gap-3">
          <div
            v-for="item in cartItems" :key="item.productId"
            class="group flex items-center gap-4 rounded-[16px] border p-4 transition-all duration-200 hover:border-[var(--c-accent-glow)]"
            style="background:var(--c-surface); border-color:var(--c-border);"
          >
            <!-- Emoji -->
            <div class="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-[12px] border text-3xl"
                 style="background:var(--c-surface-2); border-color:var(--c-border-soft);">
              {{ item.gambar }}
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <div class="text-[10px] font-semibold uppercase tracking-wider" style="color:var(--c-accent);">{{ item.kategori }}</div>
                  <div class="text-sm font-bold truncate" style="color:var(--c-text-1);">{{ item.nama }}</div>
                  <div class="mt-0.5 text-xs" style="color:var(--c-text-2);">
                    Rp {{ item.harga.toLocaleString('id-ID') }} / {{ item.satuan }}
                  </div>
                </div>
                <button
                  @click="store.removeFromCart(item.productId)"
                  class="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-150 opacity-0 group-hover:opacity-100 hover:bg-[var(--c-red-dim)] hover:text-[var(--c-red)]"
                  style="color:var(--c-text-3);"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <!-- Qty controls + subtotal -->
              <div class="mt-2.5 flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <button
                    @click="store.updateCartQty(item.productId, item.qty - 1)"
                    class="flex h-7 w-7 items-center justify-center rounded-lg border text-sm font-bold transition-all duration-150 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                    style="background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-2);"
                  >−</button>
                  <span class="w-10 text-center text-sm font-bold tabular-nums" style="color:var(--c-text-1);">{{ item.qty }}</span>
                  <button
                    @click="store.updateCartQty(item.productId, item.qty + 1)"
                    :disabled="item.qty >= item.stok"
                    class="flex h-7 w-7 items-center justify-center rounded-lg border text-sm font-bold transition-all duration-150 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)] disabled:opacity-40 disabled:cursor-not-allowed"
                    style="background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-2);"
                  >+</button>
                </div>
                <div class="text-sm font-bold font-mono" style="color:var(--c-green);">
                  Rp {{ (item.harga * item.qty).toLocaleString('id-ID') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Checkout panel -->
        <div class="flex flex-col gap-4">

          <!-- Order summary -->
          <div class="rounded-[18px] border p-5" style="background:var(--c-surface); border-color:var(--c-border);">
            <h3 class="text-sm font-bold mb-4" style="color:var(--c-text-1);">Ringkasan Pesanan</h3>

            <div class="flex flex-col gap-2.5">
              <div v-for="item in cartItems" :key="item.productId"
                   class="flex items-center justify-between text-xs">
                <span class="text-[var(--c-text-2)] truncate max-w-[140px]">{{ item.nama }} ×{{ item.qty }}</span>
                <span class="font-mono font-semibold flex-shrink-0" style="color:var(--c-text-1);">
                  Rp {{ (item.harga * item.qty).toLocaleString('id-ID') }}
                </span>
              </div>
            </div>

            <div class="mt-4 border-t pt-4 space-y-2" style="border-color:var(--c-border-soft);">
              <div class="flex justify-between text-xs" style="color:var(--c-text-2);">
                <span>Subtotal ({{ store.cartCount }} item)</span>
                <span class="font-mono font-semibold" style="color:var(--c-text-1);">Rp {{ store.cartTotal.toLocaleString('id-ID') }}</span>
              </div>
              <div class="flex justify-between text-xs" style="color:var(--c-text-2);">
                <span>Diskon</span>
                <span class="font-mono font-semibold text-[var(--c-green)]">
                  - Rp {{ discount.toLocaleString('id-ID') }}
                </span>
              </div>
            </div>

            <div class="mt-3 flex justify-between items-center rounded-[12px] px-4 py-3" style="background:var(--c-surface-2);">
              <span class="text-sm font-bold" style="color:var(--c-text-1);">Total Bayar</span>
              <span class="font-mono text-[17px] font-bold" style="color:var(--c-green);">
                Rp {{ grandTotal.toLocaleString('id-ID') }}
              </span>
            </div>
          </div>

          <!-- Checkout form -->
          <div class="rounded-[18px] border p-5" style="background:var(--c-surface); border-color:var(--c-border);">
            <h3 class="text-sm font-bold mb-4" style="color:var(--c-text-1);">Detail Pembeli</h3>

            <div class="flex flex-col gap-3">
              <div>
                <label class="block text-[11px] font-semibold mb-1.5" style="color:var(--c-text-2);">Nama Pembeli</label>
                <input
                  v-model="form.namaPembeli"
                  type="text"
                  placeholder="Masukkan nama..."
                  class="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors duration-150 focus:border-[var(--c-accent)] placeholder:text-[var(--c-text-3)]"
                  style="background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-1); font-family:var(--f-sans);"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold mb-1.5" style="color:var(--c-text-2);">Metode Pembayaran</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="m in paymentMethods" :key="m.value"
                    @click="form.metodeBayar = m.value"
                    class="flex flex-col items-center gap-1.5 rounded-[12px] border p-3 text-center transition-all duration-150"
                    :style="form.metodeBayar === m.value
                      ? 'border-color:var(--c-accent); background:var(--c-accent-dim); color:var(--c-accent);'
                      : 'border-color:var(--c-border); background:var(--c-surface-2); color:var(--c-text-2);'"
                  >
                    <span class="text-xl">{{ m.icon }}</span>
                    <span class="text-[10px] font-bold leading-tight">{{ m.label }}</span>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold mb-1.5" style="color:var(--c-text-2);">Catatan (opsional)</label>
                <textarea
                  v-model="form.catatan"
                  placeholder="Tulis catatan tambahan..."
                  rows="2"
                  class="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none resize-none transition-colors duration-150 focus:border-[var(--c-accent)] placeholder:text-[var(--c-text-3)]"
                  style="background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-1); font-family:var(--f-sans);"
                />
              </div>
            </div>
          </div>

          <!-- Checkout button -->
          <button
            @click="processCheckout"
            :disabled="!canCheckout"
            class="w-full flex items-center justify-center gap-2 rounded-[14px] py-3.5 text-sm font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:opacity-90 enabled:hover:shadow-[0_6px_24px_var(--c-accent-glow)] enabled:hover:-translate-y-0.5"
            style="background:var(--c-accent);"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Proses Pembelian
          </button>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════════ TAB: RIWAYAT ════════════════════════════════════ -->
    <div v-if="activeTab === 'history'" class="flex flex-col gap-4">

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Transaksi" :value="transactions.length" icon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' accent="blue" format="number"/>
        <StatCard label="Total Omset" :value="totalRevenue" icon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>' accent="green" format="currency"/>
        <StatCard label="Rata-rata Nilai" :value="avgOrderValue" icon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' accent="purple" format="currency"/>
        <StatCard label="Item Terjual" :value="totalItemsSold" icon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>' accent="yellow" format="number"/>
      </div>

      <!-- Search history -->
      <div class="flex items-center gap-3 flex-wrap">
        <SearchBar v-model="historySearch" placeholder="Cari transaksi..." class="flex-1 max-w-xs" />
        <div class="flex gap-2">
          <button
            v-for="f in statusFilters" :key="f.value"
            @click="historyFilter = f.value"
            class="rounded-full px-4 py-1.5 text-xs font-bold border transition-all duration-150"
            :style="historyFilter === f.value
              ? 'background:var(--c-accent); border-color:var(--c-accent); color:#fff;'
              : 'background:var(--c-surface-2); border-color:var(--c-border); color:var(--c-text-2);'"
          >{{ f.label }}</button>
        </div>
      </div>

      <!-- Empty history -->
      <div v-if="filteredTransactions.length === 0"
           class="rounded-[18px] border py-16 text-center"
           style="background:var(--c-surface); border-color:var(--c-border);">
        <div class="text-5xl mb-3">📋</div>
        <h3 class="text-sm font-bold" style="color:var(--c-text-1);">Belum Ada Transaksi</h3>
        <p class="mt-1 text-xs" style="color:var(--c-text-2);">
          {{ historySearch ? 'Transaksi tidak ditemukan.' : 'Lakukan pembelian pertama Anda dari tab Keranjang.' }}
        </p>
      </div>

      <!-- Transaction list -->
      <div v-else class="flex flex-col gap-3">
        <div
          v-for="tx in filteredTransactions" :key="tx.id"
          class="rounded-[16px] border overflow-hidden transition-all duration-200 hover:border-[var(--c-accent-glow)]"
          style="background:var(--c-surface); border-color:var(--c-border);"
        >
          <!-- Transaction header -->
          <div class="flex items-center justify-between px-5 py-3.5 border-b" style="border-color:var(--c-border-soft); background:var(--c-surface-2);">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-[10px] text-lg"
                   style="background:var(--c-accent-dim);">
                {{ paymentIcon(tx.metodeBayar) }}
              </div>
              <div>
                <div class="text-xs font-bold" style="color:var(--c-text-1);">{{ tx.namaPembeli }}</div>
                <div class="text-[10px]" style="color:var(--c-text-3);">#{{ tx.id }} · {{ formatDate(tx.tanggal) }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Badge :variant="tx.status === 'Selesai' ? 'green' : tx.status === 'Diproses' ? 'yellow' : 'red'">
                {{ tx.status }}
              </Badge>
              <div class="text-sm font-bold font-mono" style="color:var(--c-green);">
                Rp {{ tx.total.toLocaleString('id-ID') }}
              </div>
            </div>
          </div>

          <!-- Transaction items -->
          <div class="px-5 py-3">
            <div class="flex flex-wrap gap-2">
              <div
                v-for="item in tx.items" :key="item.productId"
                class="flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1"
                style="background:var(--c-surface-2); border-color:var(--c-border-soft);"
              >
                <span class="text-sm">{{ item.gambar }}</span>
                <span class="text-[11px]" style="color:var(--c-text-2);">{{ item.nama }}</span>
                <span class="text-[11px] font-bold" style="color:var(--c-text-3);">×{{ item.qty }}</span>
              </div>
            </div>
            <div v-if="tx.catatan" class="mt-2 text-[11px] italic" style="color:var(--c-text-3);">
              💬 {{ tx.catatan }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Checkout Success Modal ── -->
    <Transition name="modal">
      <div v-if="showSuccessModal"
           class="fixed inset-0 z-[300] flex items-center justify-center p-4"
           style="background:rgba(0,0,0,0.6); backdrop-filter:blur(6px);"
           @click.self="showSuccessModal = false">
        <div class="w-full max-w-sm rounded-[24px] border p-8 text-center"
             style="background:var(--c-surface); border-color:var(--c-border);">
          <div class="flex justify-center mb-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full text-4xl"
                 style="background:var(--c-green-dim);">✅</div>
          </div>
          <h3 class="text-[17px] font-bold mb-2" style="color:var(--c-text-1);">Pembelian Berhasil!</h3>
          <p class="text-xs leading-relaxed mb-1" style="color:var(--c-text-2);">
            Transaksi atas nama <strong style="color:var(--c-text-1);">{{ lastCheckout?.namaPembeli }}</strong> telah dicatat.
          </p>
          <p class="text-xs mb-6" style="color:var(--c-text-3);">
            {{ lastCheckout?.items.length }} item · {{ lastCheckout?.metodeBayar }} · Rp {{ lastCheckout?.total.toLocaleString('id-ID') }}
          </p>
          <div class="flex gap-2">
            <button
              @click="showSuccessModal = false; activeTab = 'history'"
              class="flex-1 rounded-[12px] border py-2.5 text-xs font-bold transition-all duration-150 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
              style="border-color:var(--c-border); color:var(--c-text-2); background:var(--c-surface-2);"
            >Lihat Riwayat</button>
            <button
              @click="showSuccessModal = false"
              class="flex-1 rounded-[12px] py-2.5 text-xs font-bold text-white transition-all duration-150 hover:opacity-90"
              style="background:var(--c-accent);"
            >Tutup</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toastMsg" class="fixed bottom-7 left-1/2 -translate-x-1/2 z-[250] whitespace-nowrap rounded-[14px] border px-6 py-3 text-sm font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
           style="background:var(--c-surface-2); border-color:var(--c-green); color:var(--c-text-1);">
        {{ toastMsg }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/useDataStore.js'

import SectionHeader from '../components/ui/SectionHeader.vue'
import TabSwitcher   from '../components/ui/TabSwitcher.vue'
import SearchBar     from '../components/ui/SearchBar.vue'
import Badge         from '../components/ui/Badge.vue'
import StatCard      from '../components/ui/StatCard.vue'

const store = useDataStore()

/* ── Tabs ── */
const activeTab = ref('cart')

/* ── Cart items enriched ── */
const cartItems = computed(() =>
  store.cart.map(c => {
    const p = store.products.find(p => p.id === c.productId)
    return { ...c, ...p }
  })
)

/* ── Discount (flat 5% jika > 5 item) ── */
const discount = computed(() =>
  store.cartCount >= 5 ? Math.round(store.cartTotal * 0.05) : 0
)
const grandTotal = computed(() => store.cartTotal - discount.value)

/* ── Checkout form ── */
const form = ref({ namaPembeli: '', metodeBayar: 'Tunai', catatan: '' })
const canCheckout = computed(() => store.cartCount > 0 && form.value.namaPembeli.trim().length >= 2)

const paymentMethods = [
  { value: 'Tunai',    icon: '💵', label: 'Tunai' },
  { value: 'Transfer', icon: '🏦', label: 'Transfer' },
  { value: 'QRIS',     icon: '📱', label: 'QRIS' },
  { value: 'Kartu',    icon: '💳', label: 'Kartu' },
]

/* ── Transactions history ── */
const transactions = ref([])
let txCounter = 1

const showSuccessModal = ref(false)
const lastCheckout     = ref(null)

function processCheckout() {
  if (!canCheckout.value) return

  const tx = {
    id:          String(txCounter++).padStart(4, '0'),
    namaPembeli: form.value.namaPembeli.trim(),
    metodeBayar: form.value.metodeBayar,
    catatan:     form.value.catatan.trim(),
    items:       cartItems.value.map(i => ({
      productId: i.productId,
      nama:      i.nama,
      gambar:    i.gambar,
      harga:     i.harga,
      qty:       i.qty,
    })),
    subtotal:    store.cartTotal,
    diskon:      discount.value,
    total:       grandTotal.value,
    status:      'Selesai',
    tanggal:     new Date().toISOString(),
  }

  transactions.value.unshift(tx)
  lastCheckout.value = tx
  store.clearCart()
  form.value = { namaPembeli: '', metodeBayar: 'Tunai', catatan: '' }
  showSuccessModal.value = true
}

function clearCartConfirm() {
  if (confirm('Kosongkan semua item di keranjang?')) {
    store.clearCart()
    notify('Keranjang berhasil dikosongkan')
  }
}

/* ── History filter ── */
const historySearch = ref('')
const historyFilter = ref('Semua')
const statusFilters = [
  { value: 'Semua',    label: 'Semua' },
  { value: 'Selesai',  label: 'Selesai' },
  { value: 'Diproses', label: 'Diproses' },
]

const filteredTransactions = computed(() => {
  let list = transactions.value
  if (historyFilter.value !== 'Semua') list = list.filter(t => t.status === historyFilter.value)
  if (historySearch.value.trim()) {
    const q = historySearch.value.toLowerCase()
    list = list.filter(t =>
      t.namaPembeli.toLowerCase().includes(q) ||
      t.id.includes(q) ||
      t.items.some(i => i.nama.toLowerCase().includes(q))
    )
  }
  return list
})

/* ── History stats ── */
const totalRevenue    = computed(() => transactions.value.reduce((a, t) => a + t.total, 0))
const avgOrderValue   = computed(() => transactions.value.length ? Math.round(totalRevenue.value / transactions.value.length) : 0)
const totalItemsSold  = computed(() => transactions.value.reduce((a, t) => a + t.items.reduce((b, i) => b + i.qty, 0), 0))

/* ── Helpers ── */
function paymentIcon(m) {
  return { Tunai: '💵', Transfer: '🏦', QRIS: '📱', Kartu: '💳' }[m] || '💰'
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/* ── Toast ── */
const toastMsg  = ref('')
let toastTimer  = null
function notify(msg) {
  toastMsg.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2200)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to       { opacity: 0; }
.modal-enter-from > div, .modal-leave-to > div { transform: scale(0.95); }

.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to       { opacity: 0; transform: translateX(-50%) translateY(10px); }
</style>
