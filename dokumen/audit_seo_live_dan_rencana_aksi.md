# Audit SEO Live + Rencana Aksi Pemulihan
**Domain:** `lepaskuncilombok.com`
**Tanggal audit:** 21 Oktober 2026
**Metode:** crawl langsung (curl multi-User-Agent) + verifikasi status code + analisis export GSC Coverage lokal
**Status kredensial:** Google Search Console **tidak** dapat diakses dari environment audit ini. Seluruh angka performa di bawah berasal dari file export yang sudah ada di repo (`scripts/https___lepaskuncilombok.com_-Coverage-2026-10-03/`), bukan dari GSC live dan bukan estimasi.

---

## 1. Ringkasan Eksekutif

Situs **sudah bersih dari cloaking judi** — ini terverifikasi, bukan asumsi. Masalahnya sekarang bukan malware, tapi **konflik sinyal arsitektur** yang membuat Google menolak mengindeks 1.366 URL dan terus menurunkan jumlah halaman terindeks (490 → 381 dalam 10 minggu).

Lima temuan yang mengubah prioritas:

| # | Temuan | Bukti | Dampak |
|---|--------|-------|--------|
| 1 | **Homepage dan sitemap mempromosikan URL yang BERBEDA untuk armada yang sama** | 12 URL ada di sitemap tapi 0 link dari homepage; 7 URL di-link dari homepage tapi tidak ada di sitemap | Akar langsung dari 651 crawled-not-indexed |
| 2 | **Tidak ada satu pun 301 dari rencana lama yang dieksekusi** | 24 URL duplikat diuji → semua `200`, semua self-canonical | Otoritas terpecah 2–4 arah per model mobil |
| 3 | **`/sewa-fortuner-lombok/` 301 ke file gambar JPEG** | `301 → /wp-content/uploads/2024/02/sewa-fortuner-lombok.jpg` (`content-type: image/jpeg`) | Target redirect yang direkomendasikan rencana lama justru rusak |
| 4 | **AggregateRating schema mengklaim 200 ulasan; data asli 17** | Live: `ratingValue 4.9 / reviewCount 200`; `scripts/gmaps_reviews.json` = 17 entri | Risiko manual action *spammy structured data* — belum ditangani di rencana lama |
| 5 | **`priceRange` schema masih `Rp 250.000`** | Live JSON-LD vs fakta terkunci Rp300.000; `scripts/JSON-LD.json` versi benar belum dideploy | Kontradiksi harga = sinyal kepercayaan negatif + potensi keluhan |

**Penilaian jujur:** pemulihan penuh ke posisi Top 10 bukan pekerjaan 6–8 minggu seperti yang tertulis di `rencana_strategi_seo_top10.md`. Situs yang baru keluar dari hack dengan supresi kualitas sitewide biasanya butuh **3–6 bulan untuk pemulihan indeks** dan **6–9 bulan untuk Top 10** pada keyword inti. Angka ini saya bahas di §11.

---

## 2. Metodologi & Tingkat Keyakinan

Setiap klaim di dokumen ini diberi label:

- **[V] Terverifikasi** — diuji langsung terhadap server live pada 21 Okt 2026, atau dibaca langsung dari file repo.
- **[A] Asumsi** — inferensi wajar dari data yang ada, belum diuji langsung.
- **[P] Perlu data user** — butuh export GSC/GBP yang tidak tersedia di environment ini.

Uji yang dijalankan:

```bash
# 5 User-Agent × 5 URL, byte-compare
Googlebot/2.1 · Googlebot smartphone · Chrome desktop · Chrome Android · bingbot/2.0
```

---

## 3. Status Cloaking: BERSIH ✅ [V]

Ini bagian yang paling ingin Anda pastikan, dan hasilnya positif.

### 3.1 Perbandingan User-Agent

| URL | Desktop vs Googlebot | Mobile vs Googlebot-smartphone |
|-----|---------------------|-------------------------------|
| `/` (homepage) | **Identik** (md5 `d01a27c9…`, 409.004 byte) | **Identik** (md5 `4f50306a…`, 409.007 byte) |
| `/armada-lepas-kunci-lombok/` | **Identik** (273.599 byte) | — |
| `/sewa-mobil-bandara-lombok/` | **Identik** (274.961 byte) | — |
| `/sewa-mobil-toyota-avanza-di-lombok-termurah/` | **Identik** (212.044 byte) | — |
| `/tentang-kami-lepas-kunci-lombok/` | **Identik** (257.076 byte) | — |

Selisih 3 byte antara mobile dan desktop adalah nonce/hash, bukan perbedaan konten. **Tidak ada differential serving.**

### 3.2 Sisa jejak judi

Pencarian seluruh homepage untuk `indoplay`, `sv388`, `slot`, `judi`, `togel`, `gacor`, `maxwin`, `sabung`, `casino`, `poker`, `bandarq`, `toto` dengan word-boundary: **0 hit**.

> Catatan metodologis: pencarian naif untuk `bandar` menghasilkan 32 hit, tapi semuanya adalah substring dari **"bandara"** (32 kemunculan). Bukan sisa judi.

### 3.3 `robots.txt`

```
# START YOAST BLOCK — bersih, tidak ada directive cloaking
User-agent: *
Disallow: /?s=  /page/*/?s=  /search/  /wp-json/  /?rest_route=
User-agent: AdsBot      → Disallow: /
User-agent: CCBot       → Disallow: /
User-agent: Google-Extended → Disallow: /
User-agent: GPTBot      → Disallow: /
Sitemap: https://lepaskuncilombok.com/sitemap_index.xml
```

**[V] Typo `Dis` yang disebut rencana lama sudah tidak ada.** Component 3 rencana lama → **sudah selesai**, jangan dikerjakan ulang.

**Tapi ada dua masalah baru di sini:**

1. **`AdsBot → Disallow: /`** [V]. Ini memblokir crawler kualitas landing page Google Ads. Kalau Anda menjalankan Google Ads, iklan berisiko ditolak/di-*disapprove*. Kemungkinan ini sisa dari masa hack (upaya menyembunyikan cloaking dari crawler iklan). **Hapus blok ini.**
2. **`GPTBot` + `CCBot` + `Google-Extended` diblokir** [V]. Konsekuensinya: situs tidak bisa dikutip ChatGPT/Perplexity/Common Crawl. `Google-Extended` sendiri **tidak** memblokir AI Overviews (itu dikendalikan `Googlebot`), jadi jangan harap ini melindungi apa pun — tapi `GPTBot`/`CCBot` memang mengeluarkan Anda dari jawaban AI. Untuk bisnis rental yang saingannya mulai muncul di AI answer, ini kerugian bersih.

---

## 4. Baseline Riil dari Export Coverage (2026-07-05 → 2026-09-21)

Sumber: `scripts/https___lepaskuncilombok.com_-Coverage-2026-10-03/Bagan.csv` dan `Masalah penting.csv`. Ini **angka riil dari export Anda**, bukan karangan.

### 4.1 Tren indeks & tayangan [V]

| Tanggal | Tidak diindeks | Terindeks | Tayangan/hari |
|---------|---------------|-----------|---------------|
| 2026-07-10 | 1.095 | 490 | 278 |
| 2026-07-27 | 1.078 | 471 | **1.852 (puncak)** |
| 2026-08-15 | 1.359 | 430 | 204 |
| 2026-09-01 | 1.373 | 398 | 291 |
| 2026-09-21 | **1.366** | **381** | **152** |

- Penurunan tayangan puncak→akhir: **-91,8%**
- Halaman terindeks turun **490 → 381 (-22,2%)** selama 10 minggu

### 4.2 Rincian 1.366 URL tidak diindeks [V]

| Alasan | Halaman | Sisi | Bisa diperbaiki? |
|--------|---------|------|------------------|
| Di-crawl – saat ini tidak diindeks | 651 | Google | Ya, lewat kualitas + pruning |
| Halaman alternatif dengan tag kanonis yang tepat | 253 | Situs | Ya |
| Dikecualikan oleh tag `noindex` | 135 | Situs | Ya (audit ulang) |
| Halaman dengan pengalihan | 117 | Situs | Ya |
| Tidak ditemukan (404) | 106 | Situs | Ya → 410/301 |
| Diblokir oleh `robots.txt` | 70 | Situs | Ya |
| Soft 404 | 6 | Situs | Ya |
| Diblokir masalah 4xx lain | 1 | Situs | — |
| Kesalahan pengalihan | 1 | Situs | Ya |
| Error server (5xx) | 1 | Situs | Ya |
| Duplikat, Google pilih kanonis berbeda | 1 | Google | Ya |
| Ditemukan – saat ini tidak diindeks | 24 | Google | Ya |

**690 masalah berasal dari sisi situs** (bisa Anda kendalikan langsung). **675 dari sisi Google** (konsekuensi dari yang pertama).

**Dua observasi penting:**

1. **Total URL yang diketahui Google = 381 + 1.366 = 1.747.** Sitemap hanya mendeklarasikan **551** URL (38 page + 513 post). Artinya **±1.196 URL diketahui Google di luar sitemap** — kemungkinan besar sisa URL hack, attachment, tag, dan parameter. Ini yang perlu di-*flush*.
2. **Tayangan puncak 1.852/hari (27 Jul) hampir pasti bukan trafik rental.** [A] Kurva: 332 → naik ke 1.852 → runtuh tepat setelah 28 Jul. Pola ini konsisten dengan halaman cloaking judi yang membawa impresi keyword judi bervolume besar, lalu hilang saat dibersihkan. **Konsekuensinya: 1.852/hari bukan target pemulihan yang benar.** Kalau Anda mengejar angka itu, Anda mengejar trafik spam. KPI yang benar adalah impresi *query non-brand relevan* (§11).

---

## 5. Diagnosa Akar: Konflik Sinyal Ganda

Ini temuan terpenting audit ini, dan **tidak ada** di rencana lama.

Situs memberi Google **dua peta yang saling bertentangan**:

```
SITEMAP (38 page)                    HOMEPAGE (33 internal link)
├── sewa-mobil-toyota-avanza-        ├── sewa-toyota-avanza-lombok/  (3×)
│   di-lombok-termurah/              ├── sewa-fortuner-lombok-2/     (3×)
├── sewa-fortuner-lombok-           ├── sewa-innova-reborn-lombok-2/ (3×)
│   lepas-kunci-murah/               ├── sewa-mobil-brio-lombok/  ← TIDAK di sitemap
├── sewa-innova-reborn-lombok-       ├── toyota-camry/           ← TIDAK di sitemap
│   dengan-harga-termurah/           ├── sewa-mobil-mataram-…    ← TIDAK di sitemap
└── … 34 lagi                        └── … 29 lagi
```

**Hasil pengukuran [V]:**

- **12 URL ada di sitemap tapi 0 link dari homepage:** `sewa-mobil-toyota-avanza-di-lombok-termurah`, `sewa-fortuner-lombok-lepas-kunci-murah`, `sewa-innova-reborn-lombok-dengan-harga-termurah`, `sewa-alphard-di-lombok`, `sewa-mobil-brio-di-lombok-murah-2026`, `sewa-mobil-mitsubishi-xpander-di-lombok-2026`, `sewa-mobil-pajero-di-lombok-harga-termurah`, `sewa-toyota-hiace-lombok`, `sewa-mobil-honda-jazz-di-lombok-2026-…`, `paket-wisata-one-day-tour`, `sewa-mobil-sumbawa-termurah-…`, `sewa-mobil-lombok-dengan-rating-tertinggi-dan-terpercaya`
- **7 URL di-link dari homepage tapi tidak ada di sitemap:** `toyota-camry`, `honda-brv`, `honda-mobilio`, `seputar-rental-mobil-lombok`, `sewa-mobil-mataram-harga-murah-kualitas-super-bagus`, `tips-memilih-sewa-mobil-lombok`, `tips-menghitung-rincian-biaya-nonton-motogp-mandalika-2026`

**Halaman `/sewa-mobil-mataram-harga-murah-kualitas-super-bagus/` adalah halaman uang geografis** (Mataram = keyword kota utama) yang **tidak ada di sitemap** tapi di-link dari homepage. Itu kehilangan penemuan yang tidak perlu.

**Kenapa ini menghasilkan 651 crawled-not-indexed:** Google crawl 551 URL dari sitemap, menemukan 33 URL dari homepage, total ±570 URL untuk **±13 intent halaman yang sebenarnya**. Setiap kluster punya 2–4 URL dengan title/H1 berbeda tapi intent identik, masing-masing self-canonical. Google memilih satu (381 terindeks), menolak sisanya (651 crawled-not-indexed), dan menandai 253 sebagai "alternatif kanonis" — karena sinyal internal situs sendiri tidak konsisten soal mana yang kanonis.

**Diagnosa satu kalimat:** bukan kontennya yang tipis (sampel post 1.298 kata, wajar), tapi **arsitektur informasinya tidak punya pendapat** tentang URL mana yang berhak menang.

---

## 6. Temuan Teknis Live (Terverifikasi)

### 6.1 On-page homepage [V]

| Elemen | Kondisi live | Nilai |
|--------|--------------|-------|
| `<title>` | `Sewa Mobil Lombok Harga Jujur, Unit Selalu Prima Mulai 300rb` | 64 karakter ✓, harga 300rb ✓, **"Lepas Kunci" tidak ada** ❌ |
| `<h1>` | `Sewa Mobil Lombok Lepas Kunci: Jelajahi Pulau Lebih Bebas & Fleksibel` | ✓ keyword inti ada |
| Meta description | `Jasa sewa mobil Lombok lepas kunci atau dengan sopir…` | ✓ baik |
| Canonical | `https://lepaskuncilombok.com/` self-referencing | ✓ |
| `meta robots` | **Tidak ada** (= default `index,follow`) | ✓ |
| H2 | 9 heading, struktur topikal rapi (layanan, bandara, lepas kunci vs sopir, harga, wilayah, 4 langkah, testimoni, FAQ, tips) | ✓ kuat |
| `hreflang` | Tidak ada | ✓ (single-language, tidak perlu) |
| Internal link | 33 URL internal unik | Terlalu sedikit untuk 38 page + 513 post |

Ketidakcocokan title vs H1 adalah **kesempatan CTR yang dibuang**: H1 sudah menyebut "Lepas Kunci" (frasa komersial utama + exact-match domain advantage), title tidak. Ini persis poin yang sudah benar di rencana lama Component 1 — **belum dieksekusi**.

### 6.2 Structured data [V]

Satu blok `@graph` 7.297 byte berisi 4 entitas:

| Entitas | Status | Catatan |
|---------|--------|---------|
| `AutoRental` | ⚠️ **2 nilai salah** | `priceRange: "Rp 250.000 - …"` (salah, seharusnya 300.000) · `aggregateRating 4.9/200` (data asli 17) |
| `FAQPage` (6 Q) | ⚠️ **Tidak menghasilkan rich result** | Google membatasi FAQ rich result ke situs pemerintah/kesehatan sejak 2023 |
| `HowTo` (4 langkah) | ⚠️ **Tidak menghasilkan rich result** | Google menghentikan HowTo rich result (Sep 2023) |
| `BreadcrumbList` | ❌ **Invalid** | Hanya 1 `ListItem` ("Beranda"). Breadcrumb butuh ≥2 item. Ini error validasi. |

**Temuan tambahan:** `scripts/JSON-LD.json` (versi lokal yang sudah diperbaiki) **memperbaiki `priceRange` ke Rp 300.000** ✅ tapi **tetap mempertahankan `aggregateRating` 200 ulasan** ❌. Jadi file "perbaikan" itu setengah benar. Jangan deploy apa adanya.

**Rekomendasi `aggregateRating`** — pilih satu:
- **(a) Aman:** hapus `aggregateRating` dari schema. Biarkan Google Business Profile jadi satu-satunya sumber rating. Nol risiko.
- **(b) Terverifikasi:** isi dengan `reviewCount` dan `ratingValue` **persis** seperti di GBP, dan pastikan rating itu terlihat di halaman (Google mensyaratkan review yang di-markup harus terlihat oleh pengguna).

Klaim 200 ulasan saat GBP punya 17 adalah **misrepresentasi**, bukan optimasi. Risiko: manual action structured data atau sekadar diabaikan — dua-duanya merugikan.

### 6.3 Error rendering di DOM [V]

Satu `<img>` di homepage keluar sebagai **literal kode JavaScript yang tidak ter-parse**:

```html
<img src="' + imgSrc + '" alt="' + imgAlt + '" class="blog-card__photo" loading="lazy" />
```

Ini bug template: komponen kartu blog meng-*echo* string concatenation JS sebagai HTML. Akibatnya: atribut `src` berisi `' + imgSrc + '` (URL tidak valid), gambar rusak, dan Googlebot melihat markup cacat.

Saya sudah cek `src/pages/` lokal — **tidak ditemukan** sumbernya (`grep imgSrc` = 0 hit). Artinya bug ini **hanya ada di live**, kemungkinan dari modul yang di-inject lewat plugin/theme builder, bukan dari file HTML legacy di repo. **[A]** untuk asal-usulnya; **[V]** untuk keberadaannya.

### 6.4 Core Web Vitals & performa [V]

| Metrik | Nilai terukur | Penilaian |
|--------|---------------|-----------|
| TTFB homepage | 0,29 s | ✓ baik |
| HTML mentah | **405.970 byte** | ❌ sangat berat |
| Transfer terkompresi | **99.406 byte** | ✓ gzip/brotli aktif (75% reduksi) |
| **Inline CSS** | **170.541 byte = 42,1% dari HTML**, 23 blok `<style>` | ❌ akar masalah |
| Stylesheet eksternal | **0** | ❌ tidak ada cache lintas-halaman |
| `<img>` | 96 total: 69 jpg, 17 webp, 50 png, **0 avif** | ❌ format usang |
| `<img>` dengan `width=` | 36 dari 96 | ⚠️ risiko CLS |
| `loading="lazy"` | 31 | ✓ |
| `rel=preload` | **0** | ❌ |
| `rel=preconnect` | **0** | ❌ |
| Elemen LCP | `background-image: var(--wpr-bg-c4c3ea24…)` | ⚠️ background image tidak bisa di-preload sederhana |

**Interpretasi:** WP Rocket meng-*inline* seluruh CSS (mode "Remove Unused CSS"). Efeknya homepage tidak punya request CSS render-blocking — tapi **setiap halaman mengirim ulang 170 KB CSS yang sama dan tidak bisa di-cache browser.** Ini lebih buruk dari yang diasumsikan rencana lama ("409 KB DOM bloat"): masalahnya bukan cuma ukuran, tapi **hilangnya cache lintas-halaman**.

### 6.5 Header & redirect [V]

```
HTTP/2 200 · server: LiteSpeed · platform: hostinger · x-powered-by: PHP/8.2.34
cache-control: public, max-age=0          ← HTML tidak di-cache sama sekali
strict-transport-security: max-age=31536000; includeSubDomains; preload  ✓
vary: User-Agent, Accept-Encoding         ← ⚠️ lihat catatan
```

Redirect kanonik: `http→https` ✓ 301 · `www→non-www` ✓ 301 · `/index.php` ✓ 301.

**Catatan `vary: User-Agent`:** ini **residu arsitektur cloaking**. Header ini membuat cache terpisah per User-Agent — prasyarat teknis untuk cloaking. Kontennya sekarang identik (terbukti §3.1), jadi **tidak ada cloaking aktif**. Tapi header ini sebaiknya ditinjau: kalau tidak ada mobile-cache terpisah yang dibutuhkan, hapus agar cache efisien dan tidak ada "jalur" yang siap dipakai lagi.

**`cache-control: max-age=0`** berarti setiap kunjungan ulang & setiap request crawler memukul PHP. Dengan Hostinger + LiteSpeed ini masih tertahankan (TTFB 0,29 s) tapi memboroskan crawl budget.

### 6.6 Temuan redirect rusak [V] — **kritis**

| URL | Status | Tujuan | Masalah |
|-----|--------|--------|---------|
| `/sewa-fortuner-lombok/` | 301 | `/wp-content/uploads/2024/02/sewa-fortuner-lombok.jpg` (`image/jpeg`, 65 KB) | ❌ **Halaman HTML redirect ke file gambar.** Ini target yang direkomendasikan rencana lama sebagai kanonis Fortuner! |
| `/sewa-innova-reborn-lombok/` | 301 | `/sewa-innova-reborn-lombok-2/` | ⚠️ Arah redirect **kebalikan** dari rencana lama (rencana minta `-2` → slug bersih) |
| `/sewa-hiace-lombok/` | 301 | `/` (homepage) | ❌ Redirect halaman dalam → homepage = sinyal **soft 404** |
| `/sewa-alphard-lombok/` | 301 | `/sewa-alphard-lombok-2/` | ⚠️ URL tujuan tidak ada di sitemap |
| `/sewa-avanza-lombok/`, `/sewa-innova-lombok/`, `/sewa-pajero-lombok/` | 404 | — | ℹ️ Pola slug bersih tidak pernah ada |
| `/rental-mobil-lombok/` | 301 | `/` | ⚠️ Keyword paling umum redirect ke homepage |

**Implikasi langsung:** kalau Anda mengeksekusi `.htaccess` di rencana lama apa adanya, kluster Fortuner akan di-301 ke **file JPEG**. Otoritas hilang, dan Google mencatat "Kesalahan pengalihan". Ini hampir pasti salah satu penyumbang angka `soft 404: 6` dan `kesalahan pengalihan: 1` di export.

### 6.7 Kebersihan indeks lain [V]

| Uji | Hasil | Penilaian |
|-----|-------|-----------|
| `/tag/rental-mobil/` | **404** | ✓ bagus (tag archive mati) |
| `/author/admin/` | **404** | ⚠️ bagus untuk bloat, **tapi** menghapus halaman penulis = kehilangan sinyal E-E-A-T |
| `/this-page-does-not-exist-xyz123/` | **404** | ✓ benar (bukan soft 404) |
| `/feed/` | 301 | ⚠️ `robots.txt` tidak memblokir feed |
| `/?s=mobil` | 301 | ⚠️ diblokir robots tapi masih 301 — seharusnya 404 atau 410 |

### 6.8 Konten blog [V]

Sampel: `/pantai-klui-lombok-nikmati-sunset-romantis-bersama-pasangan/`
- HTTP 200, 236 KB, ±1.298 kata, self-canonical, tanpa `meta robots`
- **Schema types: `[]` — nol structured data** ❌

**513 post tanpa `Article`/`BlogPosting` schema dan tanpa entitas penulis.** Untuk situs yang perlu membangun kembali E-E-A-T pasca-hack, ini kehilangan besar: tidak ada author entity, tidak ada `datePublished`, tidak ada jalur `sameAs` ke identitas.

**Rasio topikal:** 513 post wisata vs 38 halaman layanan. **93% URL terindeks adalah konten wisata untuk situs rental mobil.** Ini bukan otomatis buruk (konten pendukung wisata relevan), tapi ketika Google harus memutuskan "apakah situs ini otoritas rental mobil atau direktori pantai?", 513 vs 38 memberi jawaban yang salah.

---

## 7. Gap: Rencana Lama vs Kondisi Live

Rencana lama punya 7 komponen. Status aktual:

| Komponen rencana lama | Status live | Catatan |
|---|---|---|
| **C1** Title homepage + "Lepas Kunci" | ❌ **Belum** | Title masih `…Harga Jujur, Unit Selalu Prima Mulai 300rb`. Rekomendasi rencana valid — eksekusi saja. |
| **C2** 301 matrix 24 URL | ❌ **Belum** (0 dari 24) | Dan 1 target di rencana (`/sewa-fortuner-lombok/`) **rusak → JPEG**. Rencana tidak boleh dieksekusi apa adanya. |
| **C3** robots.txt typo `Dis` | ✅ **Sudah** | Bersih. Tapi muncul masalah baru: `AdsBot: Disallow /`. |
| **C4** Content pruning 513 post | ❌ **Belum** | Belum ada post yang di-noindex/410. |
| **C5** Pecah 409 KB inline CSS | ❌ **Belum** | Terverifikasi masih 170 KB inline CSS, 0 stylesheet eksternal. |
| **C6** Schema `priceRange` 300rb + `sameAs` | ⚠️ **Sebagian** | File lokal `JSON-LD.json` sudah benar untuk harga, **belum dideploy**; `sameAs` tidak ada di live; `aggregateRating 200` tidak pernah dikoreksi. |
| **C7** Off-page / GBP / media lokal | ❓ Tidak bisa diaudit | Butuh akses GBP + data backlink. |

**Yang tidak ada di rencana lama tapi kritis:** konflik sitemap-vs-homepage (§5), redirect ke JPEG (§6.6) dan ke homepage (§6.6), `aggregateRating` palsu (§6.2), `BreadcrumbList` invalid (§6.2), bug literal JS (§6.3), 7 halaman penting hilang dari sitemap (§5), nol schema di 513 post (§6.8).

---

## 8. Masalah Indexability Berprioritas

Skala dampak: 🔴 tinggi · 🟠 sedang · 🟡 rendah

### P0 — Hentikan kebocoran (0–14 hari)

| # | Masalah | Bukti | Aksi | Dampak |
|---|---------|-------|------|--------|
| **P0-1** | 24 URL duplikat semuanya `200` + self-canonical | [V] 24/24 diuji | Terapkan 301 matrix **dengan target terverifikasi** (§9.1). Untuk tiap kluster: 1 pemenang, sisanya 301. | 🔴 Konsolidasi otoritas 2–4× per model. Estimasi: impresi kanal armada +15–30% dalam 30–45 hari setelah Google recrawl. |
| **P0-2** | `/sewa-fortuner-lombok/` 301 → JPEG | [V] `content-type: image/jpeg` | Redirect ulang ke `/sewa-fortuner-lombok-2/`. Hapus rule yang memetakan slug ke attachment. | 🔴 Menutup kebocoran otoritas; menghapus 1 "kesalahan pengalihan". |
| **P0-3** | `aggregateRating` 4.9/200 vs 17 ulasan asli | [V] live vs `gmaps_reviews.json` | Hapus `aggregateRating`, atau isi dengan angka GBP persis. | 🔴 Menghilangkan risiko manual action structured data. |
| **P0-4** | `priceRange` masih Rp250.000 | [V] live JSON-LD | Deploy nilai Rp300.000. **Jangan** deploy `JSON-LD.json` apa adanya (masih bawa rating 200). | 🟠 Konsistensi harga = sinyal kepercayaan; mencegah keluhan "harga di schema beda". |
| **P0-5** | Title homepage tanpa "Lepas Kunci" | [V] | `Sewa Mobil Lombok Lepas Kunci Mulai 300rb \| Lepas Kunci Lombok` (61 char) | 🟠 CTR +1–2 pp pada impresi yang ada; menangkap exact-match domain. |
| **P0-6** | `BreadcrumbList` hanya 1 item | [V] | Tambah hierarki nyata (Beranda › Armada › Model) atau hapus blok. | 🟡 Error validasi hilang; breadcrumb SERP untuk halaman dalam. |
| **P0-7** | Literal `' + imgSrc + '` di DOM | [V] 1 hit | Perbaiki komponen kartu blog; verifikasi ulang setelah fix. | 🟡 Markup bersih, satu gambar rusak hilang. |
| **P0-8** | `AdsBot: Disallow /` di robots.txt | [V] | Hapus blok AdsBot. | 🟠 Kalau ada Google Ads: mencegah disapproval. |

### P1 — Konsolidasi & pemangkasan (15–45 hari)

| # | Masalah | Bukti | Aksi | Dampak |
|---|---------|-------|------|--------|
| **P1-1** | Sitemap & homepage tidak sinkron (12 + 7 URL) | [V] `comm` diff | Satukan: sitemap = daftar kanonis final; homepage hanya link ke pemenang. | 🔴 **Akar 651 crawled-not-indexed.** Target: turun ke <150 dalam 60 hari. |
| **P1-2** | 513 post wisata, nol schema, tanpa author | [V] sampel + sitemap | Pertahankan 60–80 post terbaik; gabung artikel pantai jadi 3–5 mega-guide; sisanya `noindex,follow` atau 410. Tambah `Article` + `author`. | 🔴 Menghentikan penolakan crawl. Estimasi: 651 → <150; halaman terindeks 381 → 250+ *berkualitas*. |
| **P1-3** | 106 URL 404 | [V] dari export | 410 untuk yang memang mati; 301 ke pilar terdekat untuk yang pernah punya trafik. | 🟠 Membersihkan 106 dari 1.366. |
| **P1-4** | 117 URL "halaman dengan pengalihan" + 1 error | [V] dari export | Ratakan rantai redirect (maks 1 hop). Hapus redirect halaman-dalam → homepage. | 🟠 Memulihkan aliran PageRank; menghapus sinyal soft 404. |
| **P1-5** | 7 halaman uang tidak ada di sitemap | [V] | Tambahkan — terutama `/sewa-mobil-mataram-harga-murah-kualitas-super-bagus/`. | 🟠 Halaman keyword kota utama akhirnya ditemukan. |
| **P1-6** | 135 URL `noindex` belum diaudit | [P] butuh daftar URL | Export daftar 135 URL; pastikan tidak ada halaman uang yang ter-`noindex` tak sengaja. | 🟠 Mencegah kehilangan halaman komersial. |
| **P1-7** | 70 URL diblokir robots.txt | [P] butuh daftar | Audit: kalau sisa URL hack → biarkan; kalau halaman nyata → buka. | 🟡 Crawl budget. |
| **P1-8** | Author archive 404 | [V] | Buat 1 halaman penulis dengan bio + kredensial (E-E-A-T). | 🟠 Sinyal E-E-A-T pasca-hack. |
| **P1-9** | `/sewa-innova-zenix-g/` vs `/sewa-innova-zenix-q-lombok/` | [V] | Gabung jadi 1 halaman dengan tabel perbandingan trim G vs Q. | 🟡 Menghapus 1 kluster kanibalisasi. |

### P2 — Performa & pertumbuhan (45–90 hari)

| # | Masalah | Bukti | Aksi | Dampak |
|---|---------|-------|------|--------|
| **P2-1** | 170 KB CSS inline, 0 stylesheet eksternal | [V] 42,1% HTML | Ekstrak ke 1 file `homepage.min.css` yang di-cache + CDN. | 🔴 Hemat ±170 KB × setiap halaman × setiap kunjungan. LCP & INP membaik. |
| **P2-2** | Nol `preload`/`preconnect`; LCP = CSS background | [V] | Preload gambar hero (`fetchpriority="high"`), preconnect ke domain gambar. | 🔴 LCP −0,5–1,2 s (estimasi). |
| **P2-3** | 69 jpg / 50 png / 0 avif; 60 img tanpa `width` | [V] | Konversi ke WebP/AVIF; tambah `width`/`height` di semua `<img>`. | 🟠 CLS <0,1; LCP membaik. |
| **P2-4** | Deploy modul `src/stitch/` (11 section, 7 bandara, 5 tentang) | [V] `stitch` = 0 hit di live | Implementasi **setelah** redirect selesai. Kalau halaman berubah sebelum redirect, otoritas pecah lagi. | 🟠 Struktur lebih ringan + konten lebih dalam. |
| **P2-5** | `GPTBot`/`CCBot`/`Google-Extended` diblokir | [V] | Buka `GPTBot` + `CCBot` kalau ingin dikutip AI search. | 🟡 Visibilitas AI answer. |
| **P2-6** | `vary: User-Agent` + `cache-control: max-age=0` | [V] | Tinjau; aktifkan page cache (LiteSpeed Cache) untuk HTML. | 🟡 Crawl budget, TTFB kunjungan ulang. |
| **P2-7** | `FAQPage`/`HowTo` tidak lagi memberi rich result | [V] + kebijakan Google | Pertahankan bila dipakai untuk AI/entity context, tapi jangan harap SERP feature. | 🟡 Ekspektasi realistis. |
| **P2-8** | "Bandara ZAM" — kode IATA salah | [V] IATA resmi = **LOP** (ICAO WADL) | Ganti ke "Bandara Lombok (LOP)" konsisten di H2, FAQ, schema `areaServed`, HowTo step 4. | 🟡 Kredibilitas; pengguna yang tahu kode bandara melihat inkonsistensi. |

> **Catatan P2-8:** ini kesalahan faktual yang layak diperbaiki. Kode IATA Bandara Internasional Lombok (BIZAM) adalah **LOP**, bukan ZAM. "BIZAM" adalah singkatan *nama* bandara, bukan kode. Rencana lama memakai "BIL" — itu juga bukan kode resmi (hanya singkatan informal lama). Rujukan: [Wikipedia ID — Bandara Udara Internasional Lombok](https://id.wikipedia.org/wiki/Bandara_Udara_Internasional_Lombok).

---

## 9. Rencana Aksi 30 / 60 / 90 Hari

### 9.1 Matriks 301 — dengan target terverifikasi

**Jangan** pakai `.htaccess` dari rencana lama. Berikut matriks yang sudah saya verifikasi status targetnya di live:

| Kluster | KEEP (kanonis, terverifikasi 200) | 301 dari | Alasan pilihan |
|---------|-----------------------------------|----------|----------------|
| Avanza | `/sewa-toyota-avanza-lombok/` | `/sewa-mobil-toyota-avanza-di-lombok-termurah/`, `/sewa-avanza-murah-lombok/` | Slug bersih, sudah 3× di-link homepage. Tambahkan ke sitemap. |
| Innova Reborn | `/sewa-innova-reborn-lombok-2/` | `/sewa-innova-reborn-lombok-dengan-harga-termurah/` | `-2` sudah jadi tujuan redirect live + 3× di-link homepage + ada di sitemap. **Arah rencana lama harus dibalik.** |
| Fortuner | `/sewa-fortuner-lombok-2/` | `/sewa-fortuner-lombok-lepas-kunci-murah/` **dan perbaiki `/sewa-fortuner-lombok/` → JPEG** | Satu-satunya kandidat hidup yang di-link homepage. |
| Hiace Premio | `/sewa-toyota-hiace-premio/` | `/sewa-hiace-premio-lombok/`, `/sewa-toyota-hiace-lombok/` | Satu-satunya yang ada di sitemap **dan** di-link homepage. |
| Brio | `/sewa-brio-lombok/` | `/sewa-mobil-brio-di-lombok-murah-2026/` | Di-link homepage 3×; tambahkan ke sitemap. |
| Xpander | `/sewa-xpander-lombok/` | `/sewa-mobil-mitsubishi-xpander-di-lombok-2026/` | Ada di keduanya. |
| Alphard | `/sewa-toyota-alphard-lombok/` | `/sewa-alphard-di-lombok/` | Ada di keduanya. Pertahankan `/sewa-alphard-hybrid-murah-di-lombok/` **hanya jika** unit Hybrid benar-benar ada. |
| Pajero | `/sewa-pajero-sport-lombok/` | `/sewa-mobil-pajero-di-lombok-harga-termurah/` | Ada di keduanya. |
| Paket Wisata | `/paket-wisata/` | `/paket-wisata-one-day-tour/` | Gabung; one-day-tour jadi section + anchor. |
| Innova Zenix | `/sewa-innova-zenix-lombok/` (halaman baru) | `/sewa-innova-zenix-g/`, `/sewa-innova-zenix-q-lombok/` | Trim G vs Q terlalu tipis untuk 2 halaman. |
| Halaman tanpa intent | `/armada-lepas-kunci-lombok/` | `/sewa-mobil-lombok-dengan-rating-tertinggi-dan-terpercaya/` | Klaim "rating tertinggi" tanpa bukti, 0 link homepage. |

**Total: 26 URL → 13 kanonis.**

**Aturan eksekusi:** 301 selalu **1 hop**. Verifikasi setelah deploy: setiap URL di kolom "301 dari" harus `301` langsung ke kanonis (bukan 302, bukan rantai, bukan gambar).

### 9.2 Hari 0–30: Stop bleeding

| Minggu | Aksi | Pemilik | Ukuran sukses |
|--------|------|---------|---------------|
| 1 | Fix P0-2 (redirect JPEG), P0-3 (aggregateRating), P0-4 (priceRange), P0-6 (breadcrumb), P0-7 (literal JS), P0-8 (AdsBot) | Dev | Rich Results Test: 0 error. Tidak ada 301 → non-HTML. |
| 1 | Deploy P0-5 (title homepage) | SEO | Title di SERP memuat "Lepas Kunci" |
| 2 | Terapkan seluruh matriks 301 §9.1 | Dev | 26 URL terverifikasi `301` 1-hop |
| 2–3 | Sinkronkan homepage ↔ sitemap (P1-1): update 33 link homepage ke pemenang; regenerate sitemap | Dev/SEO | 0 URL di sitemap tanpa link internal; 0 halaman uang di luar sitemap |
| 3 | Tambah 7 halaman yang hilang dari sitemap (P1-5) | SEO | Sitemap = 45 page |
| 3–4 | Mulai audit 513 post: klasifikasi keep/merge/noindex | SEO | Daftar 513 post terklasifikasi |

**Target hari 30:** crawled-not-indexed 651 → **<500**; halaman terindeks 381 → **390+**; 0 redirect rusak.

### 9.3 Hari 31–60: Konsolidasi konten

| Minggu | Aksi | Ukuran sukses |
|--------|------|---------------|
| 5–6 | Pruning eksekusi: 513 post → 60–80 keep, 3–5 mega-guide gabungan, sisanya `noindex,follow` / 410 | Sitemap post 513 → <90 |
| 5–6 | Ratakan 117 redirect + 106 404 (P1-3, P1-4) | 0 rantai redirect; 404 → 410/301 |
| 6 | Deploy `Article` + `BlogPosting` + `author` schema ke post yang dipertahankan | 0 post tanpa schema |
| 7 | Buat 1 halaman penulis (E-E-A-T, P1-8) | Halaman `/tentang-penulis/` live |
| 7–8 | Resubmit sitemap; minta indexing untuk 13 kanonis via GSC URL Inspection | 13 kanonis terindeks |
| 8 | Audit 135 noindex + 70 robots-blocked (butuh export URL dari user) | 0 halaman uang ter-noindex |

**Target hari 60:** crawled-not-indexed **<200**; terindeks **430+**; sitemap <140 URL total.

### 9.4 Hari 61–90: Performa & pertumbuhan

| Minggu | Aksi | Ukuran sukses |
|--------|------|---------------|
| 9–10 | P2-1: ekstrak 170 KB CSS inline → 1 file ter-cache | HTML homepage <150 KB mentah |
| 9–10 | P2-2: preload hero (`fetchpriority="high"`) + preconnect | LCP <2,5 s (lab) |
| 10–11 | P2-3: WebP/AVIF + `width`/`height` semua img | CLS <0,1; 0 img tanpa dimensi |
| 11–12 | Deploy `src/stitch/` homepage 11-section (kalau CWV baseline sudah sehat) | Semua H2 & schema lama tetap ada atau lebih baik |
| 12 | P2-5/P2-6: buka GPTBot/CCBot, aktifkan page cache, tinjau `vary` | TTFB kunjungan ulang <0,2 s |

**Target hari 90:** crawled-not-indexed **<150**; terindeks **450+**; LCP <2,5 s; 0 error schema.

---

## 10. Data yang Perlu Anda Berikan

Audit ini tidak mengarang angka GSC. Untuk mempertajam prioritas, saya butuh export berikut:

| # | Export | Dari mana | Untuk apa |
|---|--------|-----------|-----------|
| 1 | **Daftar 135 URL `noindex`** | GSC → Indexing → Pages → klik "Dikecualikan oleh tag noindex" → Export | Pastikan tidak ada halaman uang ter-noindex tak sengaja |
| 2 | **Daftar 106 URL 404** | GSC → Indexing → "Not found (404)" → Export | Bedakan sisa hack vs halaman yang pernah bertrafik |
| 3 | **Daftar 117 URL redirect** | GSC → Indexing → "Page with redirect" → Export | Deteksi rantai & loop |
| 4 | **Daftar 70 URL diblokir robots** | GSC → Indexing → "Blocked by robots.txt" → Export | Putuskan buka/blokir |
| 5 | **Performance → Queries, 16 bulan, dengan filter brand vs non-brand** | GSC → Search results → Export CSV | **Kritis:** memisahkan impresi judi dari impresi rental (lihat §4.2) |
| 6 | **Performance grouped by Page → 16 bulan** | idem | Atribusi penurunan per URL |
| 7 | **Core Web Vitals report (mobile)** | GSC → Experience → Core Web Vitals | Baseline LCP/INP/CLS lapangan, bukan lab |
| 8 | **Manual Actions + Security Issues** | GSC → Security & Manual actions | Konfirmasi tidak ada sisa penalti hack |
| 9 | **Jumlah ulasan + rating GBP aktual** | Google Business Profile | Menentukan nilai `aggregateRating` yang sah |
| 10 | **Backlink export** (Ahrefs/Semrush/GSC Links) | — | Deteksi backlink judi sisa hack yang perlu `disavow` |

**Poin #8 dan #10 adalah risiko terbesar yang belum bisa saya nilai.** Sisa backlink dari jaringan judi adalah penyebab paling umum supresi kualitas pasca-hack yang bertahan berbulan-bulan, dan itu tidak akan pulih hanya dengan perbaikan teknis.

---

## 11. KPI Realistis & Koreksi Ekspektasi

### 11.1 Koreksi terhadap rencana lama

Rencana lama menargetkan (baris 276–278):
> "Minggu ke-2: rank 30 → 18–22 · Minggu ke-4: rank 11–15 · Minggu ke-6–8: Top 10"

**Ini tidak realistis dan saya sarankan tidak dipakai sebagai janji ke klien.** Alasannya:

1. Halaman terindeks **masih turun** (490 → 381) saat audit ini. Situs belum mencapai titik stabil. Selama kurva ini masih menurun, belum ada dasar untuk memprediksi kenaikan peringkat.
2. 651 crawled-not-indexed belum tersentuh. Google harus **mencrawl ulang dan menerima ulang** ratusan URL sebelum peringkat bisa bergerak.
3. Kalau ada sisa backlink judi (poin #10 §10), ada fase pembersihan + `disavow` + waktu tunggu *reassessment* yang tidak bisa dipercepat.
4. Kluster armada butuh recrawl setelah 301 — biasanya 2–6 minggu hanya untuk Google *menemukan* redirect, lalu 4–8 minggu lagi untuk konsolidasi otoritas.

### 11.2 KPI yang saya sarankan

| Horizon | KPI | Baseline (terukur) | Target |
|---------|-----|--------------------|--------|
| 30 hari | Crawled-not-indexed | 651 | <500 |
| 30 hari | Halaman terindeks | 381 | 390+ (**berhenti turun** = sinyal pertama pemulihan) |
| 30 hari | Redirect rusak (301 → non-HTML) | 1 (Fortuner→JPEG) + 1 (Hiace→home) | 0 |
| 60 hari | Crawled-not-indexed | 651 | <200 |
| 60 hari | Halaman terindeks | 381 | 430+ |
| 60 hari | Sitemap URL total | 551 | <140 (sengaja turun — kualitas > kuantitas) |
| 90 hari | Crawled-not-indexed | 651 | <150 |
| 90 hari | Imresi harian non-brand relevan | ~152 total (belum terpisah) | 250–400 *(estimasi)* |
| 90 hari | LCP mobile (lab) | belum terukur | <2,5 s |
| 6 bulan | Posisi "sewa mobil lombok lepas kunci" | ~30 | 11–15 |
| 9 bulan | Posisi "sewa mobil lombok lepas kunci" | ~30 | 4–9 |

**Kenapa 90 hari hanya menargetkan impresi 250–400, bukan 1.852:** angka 1.852/hari adalah trafik keyword judi yang sudah dihapus. Mengejarnya berarti mengejar spam. Pertumbuhan yang benar harus datang dari query rental — dan itu mulai dari basis kecil.

**Kenapa sitemap saya sarankan *turun* dari 551 ke <140:** ini terasa kontra-intuitif tapi itu inti pemulihannya. 93% URL saat ini adalah konten wisata yang Google tolak crawl. Memangkas ke ±120 URL berkualitas tinggi memberi Google alasan untuk mengindeks **semuanya**, alih-alih mencrawl 551 dan menolak 651.

---

## 12. Lampiran: Perintah Verifikasi

Reproduksi seluruh temuan audit ini:

```bash
# 1. Uji cloaking (harus IDENTIK per kelas perangkat)
UA_MOB="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/131.0.0.0 Mobile Safari/537.36"
UA_GBOT="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
curl -s -A "$UA_MOB"  https://lepaskuncilombok.com/ -o mob.html
curl -s -A "$UA_GBOT" https://lepaskuncilombok.com/ -o gbot.html
md5sum mob.html gbot.html

# 2. Deteksi sisa judi (harus 0)
grep -oiE '\b(indoplay|sv388|slot|judi|togel|gacor|maxwin|sabon|casino|poker|toto)' mob.html | sort | uniq -c

# 3. Status semua kluster duplikat (harus 301 setelah perbaikan)
for u in /sewa-mobil-toyota-avanza-di-lombok-termurah/ /sewa-fortuner-lombok-lepas-kunci-murah/ \
         /sewa-innova-reborn-lombok-dengan-harga-termurah/ /sewa-mobil-brio-di-lombok-murah-2026/ ; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://lepaskuncilombok.com$u)"
done

# 4. Deteksi redirect ke non-HTML (harus kosong)
curl -sI "$(curl -s -o /dev/null -w '%{redirect_url}' https://lepaskuncilombok.com/sewa-fortuner-lombok/)" \
  | grep -i content-type

# 5. Ukuran inline CSS (harus turun drastis setelah P2-1)
python3 -c "
import re; h=open('mob.html',encoding='utf-8',errors='replace').read()
st=re.findall(r'<style[^>]*>(.*?)</style>', h, re.S)
print('inline CSS bytes:', sum(len(x) for x in st), '=', round(100*sum(len(x) for x in st)/len(h),1), '% of HTML')"

# 6. Gap sitemap vs homepage
grep -o '<loc>[^<]*</loc>' page-sitemap.xml | sed 's/<[^>]*>//g' | sed 's|https://lepaskuncilombok.com||' | sort -u > sm.txt
grep -oE 'href="https://lepaskuncilombok\.com/[^"]*"' mob.html | sed 's/href="//;s/"//;s|https://lepaskuncilombok.com||' | sort -u > hl.txt
comm -23 hl.txt sm.txt   # di homepage, tidak di sitemap
comm -13 hl.txt sm.txt   # di sitemap, tidak di homepage
```

**Verifikasi pasca-perbaikan (wajib):**
- [Rich Results Test](https://search.google.com/test/rich-results) untuk URL homepage → 0 error, 0 warning `BreadcrumbList`
- GSC → URL Inspection → "Test live URL" untuk 13 kanonis → semua `Indexable`
- `curl -sI` setiap target 301 → `content-type: text/html`, bukan `image/*`

---

## Ringkasan Satu Halaman

**Kabar baik:** cloaking judi sudah benar-benar bersih. Tidak ada differential serving di 5 halaman × 5 User-Agent. `robots.txt` bersih. Tidak ada sisa keyword judi. Kerja pembersihan Anda berhasil.

**Kabar yang perlu perhatian:** pemulihan belum terjadi karena 3 hal yang belum disentuh — (1) arsitektur URL duplikat yang saling berebut dengan sinyal sitemap-homepage yang bertentangan, (2) 513 artikel wisata yang membuat Google menolak crawl 651 URL, (3) satu redirect aktif yang mengirim halaman Fortuner ke file JPEG.

**Urutan yang benar:** perbaiki kebocoran (P0) → satukan sinyal URL (P1) → pangkas konten (P1) → baru kejar performa & desain baru dari `src/stitch/` (P2). Membalik urutan ini — misalnya deploy desain stitch dulu — akan memecah ulang otoritas yang baru saja Anda konsolidasikan.

**Ekspektasi jujur:** 30 hari untuk berhenti turun, 60 hari untuk indeks mulai pulih, 6–9 bulan untuk Top 10. SEO pasca-hack adalah pemulihan kepercayaan, bukan perbaikan teknis — dan kepercayaan butuh siklus recrawl berulang yang tidak bisa dipercepat.
