import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateDailyData(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
    omset: randomBetween(800_000, 4_500_000),
    transaksi: randomBetween(5, 42),
    modal: randomBetween(400_000, 2_000_000),
  }))
}

function generateMonthlyData(year) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
  return months.map((label, i) => ({
    label, month: i + 1,
    omset: randomBetween(18_000_000, 75_000_000),
    transaksi: randomBetween(120, 900),
    modal: randomBetween(10_000_000, 40_000_000),
  }))
}

export const useDataStore = defineStore('data', () => {

  /* ── State ── */
  const currentYear = ref(2025)
  const currentMonth = ref(new Date().getMonth() + 1)

  const products = ref([
    { id: 1, nama: 'Beras Premium 5kg', kategori: 'Sembako', harga: 78_000, stok: 142, satuan: 'karung', gambar: '🌾', deskripsi: 'Beras premium kualitas terbaik, pulen dan harum. Cocok untuk keluarga.' },
    { id: 2, nama: 'Minyak Goreng 2L', kategori: 'Sembako', harga: 35_000, stok: 87, satuan: 'botol', gambar: '🫙', deskripsi: 'Minyak goreng jernih, bebas kolesterol, cocok untuk menggoreng dan menumis.' },
    { id: 3, nama: 'Gula Pasir 1kg', kategori: 'Sembako', harga: 16_500, stok: 230, satuan: 'kg', gambar: '🍬', deskripsi: 'Gula pasir putih bersih, manis alami dari tebu pilihan.' },
    { id: 4, nama: 'Indomie Goreng', kategori: 'Mie Instan', harga: 3_500, stok: 480, satuan: 'bungkus', gambar: '🍜', deskripsi: 'Mie instan goreng rasa original, favorit semua kalangan. Praktis dan lezat.' },
    { id: 5, nama: 'Kopi Kapal Api 165g', kategori: 'Minuman', harga: 22_000, stok: 96, satuan: 'sachet', gambar: '☕', deskripsi: 'Kopi bubuk asli pilihan, aroma kuat dan rasa khas yang nikmat setiap pagi.' },
    { id: 6, nama: 'Sabun Mandi Lifebuoy', kategori: 'Kebersihan', harga: 5_500, stok: 340, satuan: 'buah', gambar: '🧼', deskripsi: 'Sabun mandi antibakteri, menjaga kebersihan dan kesehatan kulit sepanjang hari.' },
    { id: 7, nama: 'Telur Ayam', kategori: 'Segar', harga: 28_000, stok: 60, satuan: 'kg', gambar: '🥚', deskripsi: 'Telur ayam negeri segar langsung dari peternak. Bergizi tinggi dan segar.' },
    { id: 8, nama: 'Susu UHT Ultramilk', kategori: 'Minuman', harga: 18_500, stok: 55, satuan: 'kotak', gambar: '🥛', deskripsi: 'Susu UHT full cream, kaya kalsium dan protein. Baik untuk pertumbuhan anak.' },
    { id: 9, nama: 'Tepung Terigu 1kg', kategori: 'Sembako', harga: 12_000, stok: 110, satuan: 'kg', gambar: '🌾', deskripsi: 'Tepung terigu serbaguna untuk kue, roti, dan masakan. Halus dan mudah larut.' },
    { id: 10, nama: 'Detergen Rinso 800g', kategori: 'Kebersihan', harga: 26_000, stok: 73, satuan: 'bungkus', gambar: '🧺', deskripsi: 'Detergen bubuk formula baru, membersihkan noda membandel dan wangi tahan lama.' },
    { id: 11, nama: 'Teh Botol Sosro', kategori: 'Minuman', harga: 5_000, stok: 200, satuan: 'botol', gambar: '🍵', deskripsi: 'Teh manis dalam botol, segar dan praktis untuk diminum kapan saja.' },
    { id: 12, nama: 'Sampo Pantene 170ml', kategori: 'Kebersihan', harga: 18_000, stok: 95, satuan: 'botol', gambar: '🧴', deskripsi: 'Sampo perawatan rambut, membuat rambut kuat, berkilau, dan tidak mudah rontok.' },
    { id: 13, nama: 'Biskuit Roma Kelapa', kategori: 'Snack', harga: 8_500, stok: 165, satuan: 'bungkus', gambar: '🍪', deskripsi: 'Biskuit renyah rasa kelapa, cocok untuk camilan keluarga di segala suasana.' },
    { id: 14, nama: 'Sarden ABC 155g', kategori: 'Mie Instan', harga: 13_000, stok: 120, satuan: 'kaleng', gambar: '🐟', deskripsi: 'Sarden dalam saus tomat pedas, kaya omega-3. Praktis dan bergizi.' },
    { id: 15, nama: 'Chitato Sapi Panggang', kategori: 'Snack', harga: 10_000, stok: 210, satuan: 'bungkus', gambar: '🥔', deskripsi: 'Keripik kentang rasa sapi panggang, renyah dan gurih. Camilan favorit semua usia.' },
  ])

  const cart = ref([]) // { productId, qty }

  const monthlyData = ref(generateMonthlyData(currentYear.value))
  const dailyDataCache = ref({})

  /* ── Getters ── */
  const getDailyData = computed(() => (month = currentMonth.value) => {
    const key = `${currentYear.value}-${month}`
    if (!dailyDataCache.value[key])
      dailyDataCache.value[key] = generateDailyData(currentYear.value, month)
    return dailyDataCache.value[key]
  })

  const todayData = computed(() => { const t = new Date().getDate(); const d = getDailyData.value(currentMonth.value); return d[t - 1] || d[d.length - 1] })
  const thisMonthData = computed(() => monthlyData.value.find(m => m.month === currentMonth.value) || monthlyData.value[0])
  const totalOmsetTahun = computed(() => monthlyData.value.reduce((a, m) => a + m.omset, 0))
  const totalTransaksiTahun = computed(() => monthlyData.value.reduce((a, m) => a + m.transaksi, 0))
  const lowStockProducts = computed(() => products.value.filter(p => p.stok < 80).sort((a, b) => a.stok - b.stok))
  const topProducts = computed(() =>
    [...products.value].map(p => ({ ...p, revenue: p.harga * randomBetween(20, 200) }))
      .sort((a, b) => b.revenue - a.revenue).slice(0, 5)
  )

  const categories = computed(() => ['Semua', ...new Set(products.value.map(p => p.kategori))])

  const cartCount = computed(() => cart.value.reduce((a, c) => a + c.qty, 0))
  const cartTotal = computed(() => cart.value.reduce((a, c) => {
    const p = products.value.find(p => p.id === c.productId)
    return a + (p ? p.harga * c.qty : 0)
  }, 0))

  /* ── Actions ── */
  function setMonth(month) { currentMonth.value = month }
  function setYear(year) { currentYear.value = year; monthlyData.value = generateMonthlyData(year) }

  function addToCart(productId, qty = 1) {
    const existing = cart.value.find(c => c.productId === productId)
    if (existing) existing.qty += qty
    else cart.value.push({ productId, qty })
  }

  function removeFromCart(productId) {
    cart.value = cart.value.filter(c => c.productId !== productId)
  }

  function updateCartQty(productId, qty) {
    const item = cart.value.find(c => c.productId === productId)
    if (item) { if (qty <= 0) removeFromCart(productId); else item.qty = qty }
  }

  function clearCart() { cart.value = [] }

  return {
    currentYear, currentMonth, products, monthlyData, cart,
    getDailyData, todayData, thisMonthData,
    totalOmsetTahun, totalTransaksiTahun,
    lowStockProducts, topProducts, categories,
    cartCount, cartTotal,
    setMonth, setYear,
    addToCart, removeFromCart, updateCartQty, clearCart,
  }
})
