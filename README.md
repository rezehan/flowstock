<div align="center">

<br/>

```
  ██╗███╗   ██╗██╗   ██╗███████╗███╗   ██╗████████╗ ██████╗ ██████╗ ██╗   ██╗
  ██║████╗  ██║██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝
  ██║██╔██╗ ██║██║   ██║█████╗  ██╔██╗ ██║   ██║   ██║   ██║██████╔╝ ╚████╔╝ 
  ██║██║╚██╗██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝  
  ██║██║ ╚████║ ╚████╔╝ ███████╗██║ ╚████║   ██║   ╚██████╔╝██║  ██║   ██║   
  ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝  
```

### 📦 Aplikasi manajemen inventori toko serba ada — modern, ringan, dan intuitif.

<br/>

[![Vue 3](https://img.shields.io/badge/Vue-3.5.34-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0.4-f7d336?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.1-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.1-ff6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

<br/>

</div>

---

## ✨ Tentang Proyek

**Inventory App** adalah aplikasi web ringan untuk membantu pemilik toko kecil hingga menengah mengelola produk, memantau omset, dan mencatat transaksi, semuanya dalam satu antarmuka yang bersih dan responsif.

Dibangun dengan semangat *developer-first*: tidak ada backend rumit, tidak ada database eksternal, langsung jalan dari browser.

---

## 🗂️ Halaman & Fitur

### 🏠 Dashboard
> Pusat komando toko kamu dalam sekejap pandang.

- **4 stat card** — Omset hari ini, bulan ini, tahun ini, dan total produk
- **Grafik omset interaktif** — Pilih tampilan harian atau bulanan, ganti antara Bar Chart & Line Chart
- **Ringkasan cepat** — Total, rata-rata, tertinggi, dan terendah dalam satu baris pill
- **Produk terlaris** — Top 5 produk berdasarkan estimasi pendapatan bulan ini
- **⚠️ Stok menipis** — Peringatan visual dengan indikator warna (merah/kuning/hijau)

---

### 🛍️ Katalog Produk
> Temukan produk yang kamu butuhkan dalam hitungan detik.

- **Pencarian real-time** berdasarkan nama atau kategori
- **Filter kategori** dengan pill interaktif (Sembako, Minuman, Snack, Kebersihan, dll.)
- **Urutkan** berdasarkan nama, harga terendah, harga tertinggi, atau stok
- **Product Card** dengan tombol tambah ke keranjang cepat
- **Detail produk** melalui modal popup dengan kontrol jumlah pesanan
- **Floating cart button** — total keranjang selalu terlihat di pojok layar
- **Toast notification** — konfirmasi setiap aksi penambahan produk

---

### 🛒 Halaman Pembelian
> Keranjang belanja yang lengkap dan riwayat transaksi yang rapi.

- **Manajemen keranjang** — atur jumlah, hapus item, atau kosongkan semua
- **Ringkasan checkout** — subtotal per item dan total keseluruhan
- **Tab Riwayat** — catatan transaksi sebelumnya
- **Empty state** yang informatif dengan aksi langsung ke Katalog

---

### 📦 Inventory *(Coming Soon)*
> Manajemen stok lengkap — segera hadir!

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) + Composition API + `<script setup>` |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| State Management | [Pinia 3](https://pinia.vuejs.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Custom Properties |
| Charts | [Chart.js 4](https://www.chartjs.org/) via [vue-chartjs](https://vue-chartjs.org/) |
| Routing | [Vue Router 4](https://router.vuejs.org/) (Hash Mode) |

---

## 🚀 Cara Menjalankan

### Prasyarat
- **Node.js** v18 atau lebih baru
- **npm** v9+

### Instalasi

```bash
# Clone repositori
git clone https://github.com/username/inventory-app.git
cd inventory-app

# Install dependensi
npm install

# Jalankan server development
npm run dev
```

Buka browser dan akses `http://localhost:5173` — selesai! 🎉

### Build untuk Produksi

```bash
npm run build
npm run preview
```

---

## 📁 Struktur Proyek

```
inventory-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # CSS global & aset statis
│   ├── components/
│   │   ├── charts/      # RevenueChart
│   │   ├── katalog/     # ProductModal
│   │   ├── layout/      # Navbar, Sidebar
│   │   └── ui/          # Badge, ProductCard, SearchBar, StatCard, dll.
│   ├── pages/
│   │   ├── Dashboard.vue
│   │   ├── Katalog.vue
│   │   ├── Inventory.vue
│   │   └── Pembelian.vue
│   ├── router/          # Konfigurasi Vue Router
│   ├── stores/          # Pinia store (useDataStore)
│   └── main.js
├── index.html
├── vite.config.js
└── tailwind.config.js
```

---

## 🎨 Desain & Theming

Antarmuka menggunakan sistem **CSS Custom Properties** (`--c-surface`, `--c-accent`, `--c-text-*`, dll.) yang memungkinkan theming konsisten di seluruh komponen tanpa overhead CSS-in-JS. Warna aksen, border, dan tipografi semuanya terkontrol dari satu titik — mudah dikustomisasi sesuai branding tokomu.

---

## 🗺️ Roadmap

- [x] Dashboard dengan grafik omset
- [x] Katalog produk dengan filter & pencarian
- [x] Keranjang & halaman pembelian
- [x] Riwayat transaksi
- [ ] Manajemen inventori & stok masuk/keluar
- [ ] Export laporan ke PDF / Excel
- [ ] Mode gelap (Dark Mode)
- [ ] Autentikasi pengguna

---

## 🤝 Kontribusi

Kontribusi selalu disambut hangat! Silakan fork repositori ini, buat branch baru, dan ajukan pull request. Untuk perubahan besar, buka *issue* terlebih dahulu agar kita bisa mendiskusikannya bersama.

---

<div align="center">

Dibuat dengan ❤️ menggunakan Vue 3 + Vite

</div>
