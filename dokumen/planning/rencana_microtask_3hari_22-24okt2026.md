# Rencana Microtask 3 Hari — Eksekusi P0 + Fondasi P1
**Domain:** `lepaskuncilombok.com`  
**Sumber:** `dokumen/audit_seo_live_dan_rencana_aksi.md` (audit 21 Okt 2026)  
**Jendela eksekusi:** Kamis 22 Okt → Sabtu 24 Okt 2026  
**Disusun:** 21 Oktober 2026  

---

## 1. Aturan Main Rencana Ini

**Apa yang dikejar dalam 3 hari:** seluruh P0 (stop bleeding) + fondasi P1-1 & P1-5 (satu peta URL: sitemap = homepage = 301 matrix). Ini adalah 3 hari untuk **berhenti memberi sinyal bertentangan**, bukan 3 hari untuk pemulihan indeks.

### A. Lingkup Kerja: Apa yang Dikerjakan vs Ditunda

| Status | Lingkup Pekerjaan | Alasan & Justifikasi Teknis |
|:---|:---|:---|
| **Fokus 3 Hari** | Eksekusi seluruh P0 + Fondasi P1 (301 Matrix, pembersihan robots.txt, sinkronisasi sitemap ↔ homepage, sanitasi schema). | Menutup kebocoran PageRank dan menghapus kontradiksi sinyal ke Googlebot sesegera mungkin. |
| **Ditunda** | Pruning 513 post (P1-2) | Butuh klasifikasi keep/merge/noindex atas 513 URL + penulisan 3–5 mega-guide. Minimum 2 minggu. Mengerjakannya bersamaan 301 matrix membuat dua variabel besar berubah sekaligus → tidak bisa dibaca hasilnya. |
| **Ditunda** | Ekstrak 170 KB inline CSS (P2-1) | Perubahan tema/plugin yang menyentuh render seluruh situs. Risiko visual regression di tengah konsolidasi. Sifatnya performa, bukan indeks. |
| **Ditunda** | Deploy `src/stitch/` (P2-4) | Audit §Ringkasan sudah melarang: halaman berubah sebelum redirect selesai = otoritas pecah ulang. |
| **Ditunda** | `Article` schema 513 post (P1-2 lanjutan) | Menempel schema ke URL yang mungkin dipangkas = kerja terbuang. Urutan benar: pangkas dulu, baru schema. |
| **Ditunda** | Halaman baru `/sewa-innova-zenix-lombok/` | Butuh konten gabungan trim G vs Q + tabel. Lihat D2-06 (defer eksplisit, bukan lupa). |

### B. Lima Prinsip Kerja Wajib

| # | Prinsip | Aturan Mati & Penerapan |
|:---:|:---|:---|
| 1 | **Backup Dulu, Sentuh Kemudian** | Tidak ada task yang boleh jalan sebelum D1-01 selesai penuh. |
| 2 | **Satu Perubahan, Satu Verifikasi** | Setiap microtask memiliki perintah verifikasi mandiri; dilarang lanjut ke task berikutnya sebelum verifikasi hijau. |
| 3 | **301 Selalu 1 Hop, Selalu ke `text/html`** | Dilarang membuat rantai redirect (daisy chain) atau redirect ke file media/gambar (bug Fortuner→JPEG lahir dari pelanggaran aturan ini). |
| 4 | **Gate Harian Bertahap** | Akhir hari memiliki gate verifikasi yang wajib lolos. Jika gate Hari 1 gagal, Hari 2 **dilarang** mengeksekusi 301 matrix sampai diperbaiki. |
| 5 | **Disiplin Timebox** | Jika satu task melewati 1,5× batas estimasi waktu, hentikan segera, catat kendala di log, dan lanjut ke task berikutnya agar tidak memakan satu hari. |

### C. Legenda Pemilik Tugas (Role Owner)

| Kode Role | Penanggung Jawab | Cakupan Akses & Tanggung Jawab |
|:---:|:---|:---|
| `DEV` | Developer Teknis | Akses server Hostinger, cPanel, file `.htaccess`, wp-admin, theme code, & plugins. |
| `SEO` | SEO Specialist / Auditor | Akses Google Search Console, audit on-page, sitemap, Yoast SEO, schema structured data, & konten. |
| `USER` | Pemilik Bisnis (Owner) | Pengambilan keputusan bisnis, pembayaran, & otoritas akun kredensial sensitif. |

---

## 2. Peta 3 Hari (Satu Layar)

| Hari & Tanggal | Tema Utama | Output Terverifikasi | Alokasi Waktu |
|:---|:---|:---|:---:|
| **Hari 1 — Kam 22 Okt** | Amankan aset + matikan kebocoran redirect fatal | 0 redirect ke non-HTML / ke homepage · robots.txt bersih · title homepage baru live | ±4,5 jam |
| **Hari 2 — Jum 23 Okt** | Satu peta URL (301 matrix + sitemap ↔ homepage) | 15 rule 301 terverifikasi 1-hop · selisih sitemap–homepage = 0 | ±5,5 jam |
| **Hari 3 — Sab 24 Okt** | Schema sehat + validasi + serah terima pengukuran | Rich Results 0 error · sitemap di-resubmit · baseline sebelum/sesudah terdokumentasi | ±5 jam |

**Total microtask:** 18 task inti + 3 gate evaluasi. Estimasi total ±15 jam kerja efektif.  
**Jalur Kritis (Critical Path):** `D1-01` → `D1-03` → `D2-02` → `D2-04` → `D2-06` → `D3-02` → `D3-06`. Task ini tidak boleh ditunda atau digeser.

---

# HARI 1 — Kamis, 22 Oktober 2026
## Tema: Amankan Dulu, Lalu Matikan Kebocoran Paling Mahal

**Target Hari 1:** Tiga redirect rusak hilang, bot iklan Google (`AdsBot`) terbuka, title homepage memuat "Lepas Kunci", dan inventaris status 26 URL terkunci sebagai acuan Hari 2.

### Blok A — 08.00–09.30 · Pagar Pengaman

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D1-01** | **Backup + baseline snapshot.** Backup penuh `public_html` + database via Hostinger. Simpan salinan `.htaccess` aktif. Snapshot HTML live 20 URL kunci ke `scripts/baseline-22102026/`. Commit repo dengan pesan `baseline pra-perbaikan 22-10-2026`. | 1 file backup DB + 1 arsip file tersimpan di luar `public_html`; 20 file `.html` baseline ada; commit ada di `main`. | 45 m | USER + DEV | — |
| **D1-02** | **Catat baseline metrik.** Screenshot/ekspor: jumlah URL terindeks GSC, crawled-not-indexed, cache-control & `vary` homepage, ukuran HTML mentah, dan jumlah `<style>` blok. Masukkan ke tabel "Baseline Hari 0" di §5 dokumen ini. | Tabel §5 terisi angka nyata hari ini (bukan angka audit lama). | 25 m | SEO | — |

> **Kenapa D1-02 penting:** Audit memakai export per 21 Sep. Tanpa baseline hari ini, perubahan 3 hari tidak bisa dibuktikan secara obyektif.

### Blok B — 09.30–12.00 · Pembenahan Redirect Rusak (High Risk, High Impact)

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D1-03** | **Bunuh redirect Fortuner → JPEG.** Cari rule di `.htaccess`/plugin Redirection yang memetakan `/sewa-fortuner-lombok/` ke `/wp-content/uploads/2024/02/sewa-fortuner-lombok.jpg`. Hapus. Ganti jadi 301 → `/sewa-fortuner-lombok-2/`. | `curl -sI https://lepaskuncilombok.com/sewa-fortuner-lombok/` → `301`, `location: .../sewa-fortuner-lombok-2/`, dan target merespons `content-type: text/html`. | 30 m | DEV | D1-01 |
| **D1-04** | **Perbaiki 2 redirect halaman-dalam → homepage.** `/sewa-hiace-lombok/` 301 → `/sewa-toyota-hiace-premio/`. `/rental-mobil-lombok/` 301 → `/armada-lepas-kunci-lombok/`. | Kedua URL 301 1-hop ke halaman HTML yang relevan. Tidak ada lagi redirect liar ke `/`. | 30 m | DEV | D1-03 |
| **D1-05** | **Inventaris status 26 URL matriks §9.1.** Jalankan loop `curl -o /dev/null -w '%{http_code} %{redirect_url}'` untuk 24 URL di matriks + `/sewa-fortuner-lombok/` + `/sewa-hiace-lombok/`. Simpan hasil ke `scripts/baseline-22102026/status-26-url.txt` dan isi tabel inventaris di bawah. | File berisi 26 baris: URL, status, target, content-type. Semua yang akan di-301 di Hari 2 terkonfirmasi `200` (jika ada yang `404`, tandai — jangan buat rule). | 45 m | DEV | D1-04 |
| **D1-06** | **Bersihkan `robots.txt`.** Hapus blok `User-agent: AdsBot` → `Disallow: /`. Jangan sentuh blok lain hari ini. | Perintah `curl -s https://lepaskuncilombok.com/robots.txt` &#124; `grep -i adsbot` menghasilkan kosong. `Googlebot` tidak terblokir. | 15 m | DEV | D1-01 |

> **Catatan D1-06:** `GPTBot`/`CCBot`/`Google-Extended` **tidak** dibuka hari ini. Itu keputusan bisnis (P2-5), bukan perbaikan darurat, dan tidak memengaruhi indeks rental. Masukkan ke backlog hari 30.

#### Tabel Inventaris Status 26 URL Baseline (Eksekusi D1-05):

| # | Kluster Armada / Halaman | URL yang Dicek | Peran Saat Ini | Target 301 / Kanonis | Status HTTP Live | Content-Type Target | Catatan |
|:---:|:---|:---|:---:|:---|:---:|:---:|:---|
| 1 | Avanza | `/sewa-toyota-avanza-lombok/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 2 | Avanza | `/sewa-mobil-toyota-avanza-di-lombok-termurah/` | Duplikat | `/sewa-toyota-avanza-lombok/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 3 | Avanza | `/sewa-avanza-murah-lombok/` | Duplikat | `/sewa-toyota-avanza-lombok/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 4 | Innova Reborn | `/sewa-innova-reborn-lombok-2/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 5 | Innova Reborn | `/sewa-innova-reborn-lombok-dengan-harga-termurah/` | Duplikat | `/sewa-innova-reborn-lombok-2/` | 200 OK | text/html | Arah dibalik dari rencana lama (Terverifikasi 200) |
| 6 | Fortuner | `/sewa-fortuner-lombok-2/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 7 | Fortuner | `/sewa-fortuner-lombok-lepas-kunci-murah/` | Duplikat | `/sewa-fortuner-lombok-2/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 8 | Fortuner | `/sewa-fortuner-lombok/` | Rusak (JPEG) | `/sewa-fortuner-lombok-2/` | 301 -> JPEG | image/jpeg | Dibenahi di D1-03 (Yoast redirect) |
| 9 | Hiace Premio | `/sewa-toyota-hiace-premio/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 10 | Hiace Premio | `/sewa-hiace-premio-lombok/` | Duplikat | `/sewa-toyota-hiace-premio/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 11 | Hiace Premio | `/sewa-toyota-hiace-lombok/` | Duplikat | `/sewa-toyota-hiace-premio/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 12 | Hiace Premio | `/sewa-hiace-lombok/` | Rusak (Home) | `/sewa-toyota-hiace-premio/` | 301 -> Home | text/html | Dibenahi di D1-04 (Soft 404) |
| 13 | Brio | `/sewa-brio-lombok/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 14 | Brio | `/sewa-mobil-brio-di-lombok-murah-2026/` | Duplikat | `/sewa-brio-lombok/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 15 | Xpander | `/sewa-xpander-lombok/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 16 | Xpander | `/sewa-mobil-mitsubishi-xpander-di-lombok-2026/` | Duplikat | `/sewa-xpander-lombok/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 17 | Alphard | `/sewa-toyota-alphard-lombok/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 18 | Alphard | `/sewa-alphard-di-lombok/` | Duplikat | `/sewa-toyota-alphard-lombok/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 19 | Alphard | `/sewa-alphard-lombok/` | Duplikat | `/sewa-toyota-alphard-lombok/` | 301 -> -2 | text/html | Ganti target lama `-2` ke kanonis |
| 20 | Pajero | `/sewa-pajero-sport-lombok/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 21 | Pajero | `/sewa-mobil-pajero-di-lombok-harga-termurah/` | Duplikat | `/sewa-pajero-sport-lombok/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 22 | Paket Wisata | `/paket-wisata/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis tunggal |
| 23 | Paket Wisata | `/paket-wisata-one-day-tour/` | Duplikat | `/paket-wisata/` | 200 OK | text/html | Sumber 301 (Terverifikasi 200) |
| 24 | Landing Page | `/armada-lepas-kunci-lombok/` | Target (KEEP) | — | 200 OK | text/html | Calon kanonis katalog |
| 25 | Landing Page | `/sewa-mobil-lombok-dengan-rating-tertinggi-dan-terpercaya/` | Thin Content | `/armada-lepas-kunci-lombok/` | 200 OK | text/html | Klaim rating tanpa bukti (Terverifikasi 200) |
| 26 | Landing Page | `/rental-mobil-lombok/` | Rusak (Home) | `/armada-lepas-kunci-lombok/` | 301 -> Home | text/html | Dibenahi di D1-04 (Yoast redirect) |

### Blok C — 13.00–14.30 · Title Homepage

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D1-07** | **Ganti `<title>` homepage.** Ubah title menjadi: `Sewa Mobil Lombok Lepas Kunci Mulai 300rb` &#124; `Lepas Kunci Lombok` (61 char). Pastikan tidak ada halaman lain yang memakai title yang sama. | Title baru live di source HTML, ≤65 karakter, memuat frasa "Lepas Kunci" di depan + "300rb". H1 tidak diubah. | 20 m | DEV | D1-01 |
| **D1-08** | **Cek regresi on-page.** Audit setelah perubahan Blok B & C: periksa title, canonical `self`, meta robots (tidak boleh noindex), H1 utuh, dan harga 300rb konsisten di body text. | Checklist regresi on-page hijau 100%; sertakan screenshot SERP preview. | 25 m | SEO | D1-07 |

### Gate Hari 1 — Harus Hijau Sebelum Melangkah ke Hari 2

| # | Checkpoint Verifikasi Gate Hari 1 | Syarat Lolos (Pass Criteria) | Status Verifikasi |
|:---:|:---|:---|:---:|
| 1 | **Eliminasi Redirect Media** | Tidak ada satu pun URL yang me-redirect ke file gambar (`image/*`), khususnya Fortuner. | [ ] Lolos |
| 2 | **Eliminasi Redirect ke Home** | Tidak ada redirect dari halaman armada dalam yang dibuang ke homepage (`/`). | [ ] Lolos |
| 3 | **Validasi Fortuner 1-Hop** | `/sewa-fortuner-lombok/` → `/sewa-fortuner-lombok-2/` tepat 1 hop tanpa loop. | [ ] Lolos |
| 4 | **Sanitasi robots.txt** | File `robots.txt` bebas dari baris `AdsBot: Disallow`. | [ ] Lolos |
| 5 | **Title Homepage Live** | Tag `<title>` homepage live memuat kata "Lepas Kunci" di bagian depan. | [ ] Lolos |
| 6 | **Dokumen Inventaris Siap** | File `status-26-url.txt` terisi lengkap dan status 26 URL terkonfirmasi. | [ ] Lolos |
| 7 | **Uji Pulih Cadangan (Restore)** | File backup dan snapshot D1-01 terverifikasi valid dan siap direstore sewaktu-waktu. | [ ] Lolos |

---

# HARI 2 — Jumat, 23 Oktober 2026
## Tema: Satu Peta URL — Sitemap, Homepage, dan 301 Tidak Boleh Bertengkar

**Target Hari 2:** Matriks 301 tereksekusi dan terverifikasi 1-hop, sitemap dan homepage menunjuk daftar kanonis yang persis sama.

> **Aturan Eksekusi Hari 2:** Kerjakan **satu kluster, verifikasi langsung, baru lanjut kluster berikutnya.** Dilarang keras menulis 15 rule sekaligus lalu mengecek di akhir.

### Blok A — 08.00–10.30 · Eksekusi Matriks 301

#### Tabel Matriks Eksekusi 301 (Hanya Baris Berstatus 200 di D1-05):

| # | Kluster | URL Sumber (301 Dari) | URL Target (KEEP / Kanonis) | Catatan Khusus |
|:---:|:---|:---|:---|:---|
| 1 | Avanza | `/sewa-mobil-toyota-avanza-di-lombok-termurah/` | `/sewa-toyota-avanza-lombok/` | Tambahkan URL KEEP ke sitemap |
| 2 | Avanza | `/sewa-avanza-murah-lombok/` | `/sewa-toyota-avanza-lombok/` | Konsolidasi otoritas |
| 3 | Innova Reborn | `/sewa-innova-reborn-lombok-dengan-harga-termurah/` | `/sewa-innova-reborn-lombok-2/` | Arah **dibalik** dari rencana lama |
| 4 | Fortuner | `/sewa-fortuner-lombok-lepas-kunci-murah/` | `/sewa-fortuner-lombok-2/` | Konsolidasi ke slug `-2` |
| 5 | Fortuner | `/sewa-fortuner-lombok/` | `/sewa-fortuner-lombok-2/` | Dikerjakan di D1-03, verifikasi ulang |
| 6 | Hiace Premio | `/sewa-hiace-premio-lombok/` | `/sewa-toyota-hiace-premio/` | Konsolidasi varian |
| 7 | Hiace Premio | `/sewa-toyota-hiace-lombok/` | `/sewa-toyota-hiace-premio/` | Konsolidasi varian |
| 8 | Hiace Premio | `/sewa-hiace-lombok/` | `/sewa-toyota-hiace-premio/` | Dikerjakan di D1-04, verifikasi ulang |
| 9 | Brio | `/sewa-mobil-brio-di-lombok-murah-2026/` | `/sewa-brio-lombok/` | Tambahkan URL KEEP ke sitemap |
| 10 | Xpander | `/sewa-mobil-mitsubishi-xpander-di-lombok-2026/` | `/sewa-xpander-lombok/` | Bersihkan tahun lama |
| 11 | Alphard | `/sewa-alphard-di-lombok/` | `/sewa-toyota-alphard-lombok/` | Konsolidasi varian |
| 12 | Alphard | `/sewa-alphard-lombok/` | `/sewa-toyota-alphard-lombok/` | Ganti target lama `-2` |
| 13 | Pajero | `/sewa-mobil-pajero-di-lombok-harga-termurah/` | `/sewa-pajero-sport-lombok/` | Konsolidasi varian |
| 14 | Paket Wisata | `/paket-wisata-one-day-tour/` | `/paket-wisata/` | Dijadikan section + anchor link |
| 15 | Trust / Rating | `/sewa-mobil-lombok-dengan-rating-tertinggi-dan-terpercaya/` | `/armada-lepas-kunci-lombok/` | Klaim "rating tertinggi" tanpa bukti |

#### Tasks Blok A:

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D2-01** | **Tulis 15 rule 301 (kluster armada: baris 1–13)** di `.htaccess` (Redirect 301) atau plugin Redirection. Satu rule = satu baris. Dilarang membuat rule bersyarat User-Agent. | 13 URL armada merespons `301` 1-hop ke target kanonis yang benar. | 90 m | DEV | Gate H1 |
| **D2-02** | **Tulis 2 rule sisanya (paket wisata, rating).** Terapkan rule baris 14 dan 15. | Kedua URL merespons `301` 1-hop ke target kanonis yang ditentukan. | 20 m | DEV | D2-01 |
| **D2-03** | **Verifikasi matriks penuh (15 rule).** Loop curl: status harus `301`, `location` = target, target `content-type: text/html`, dan **tidak ada hop kedua**. Bandingkan dengan `status-26-url.txt`. | Tabel verifikasi 15/15 hijau, disimpan di `scripts/baseline-22102026/verifikasi-301-hari2.txt`. | 30 m | DEV + SEO | D2-02 |
| **D2-04** | **Defer eksplisit Innova Zenix.** URL `/sewa-innova-zenix-g/` dan `/sewa-innova-zenix-q-lombok/` **tidak** di-301 hari ini (halaman kanonis baru belum dibuat). | Tercatat resmi di §6 backlog, bukan diabaikan diam-diam. | 10 m | SEO | — |

> **Kenapa Zenix sengaja ditunda:** Aturan #3 (301 wajib ke `text/html` aktif) melarang redirect ke URL yang belum ada. Membuat halaman `/sewa-innova-zenix-lombok/` dengan konten gabungan G vs Q adalah pekerjaan penulisan konten baru.

### Blok B — 10.45–12.30 · Sinkronisasi Sitemap ↔ Homepage

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D2-05** | **Diagnosa 7 halaman hilang dari sitemap.** Untuk tiap URL pada tabel di bawah: cek status HTTP, `meta robots`, canonical, dan setting Yoast "Show in search results". Isi tabel diagnosa. | Tabel 7 baris di bawah terisi lengkap: URL · status · meta robots · akar penyebab · rencana aksi. | 45 m | SEO | — |
| **D2-06** | **Masukkan 7 halaman ke sitemap.** Prioritas mutlak: `/sewa-mobil-mataram-harga-murah-kualitas-super-bagus/` (halaman uang keyword kota utama). | Pasca-regenerate, `sitemap_index.xml` memuat ketujuh URL tersebut secara valid. | 45 m | DEV + SEO | D2-05 |
| **D2-07** | **Sinkronkan 33 internal link homepage ke pemenang.** Ganti setiap link homepage yang masih menunjuk URL kalah ➔ URL KEEP. Tambahkan link internal ke halaman sitemap yang saat ini memiliki 0 internal link. | Selisih sitemap vs homepage = **0** di kedua arah (dua arah identik). | 60 m | DEV | D2-06 |

#### Tabel Diagnosa 7 Halaman Hilang dari Sitemap (Eksekusi D2-05):

| # | URL Halaman | Status HTTP | Meta Robots Live | Setting Yoast (Index/Noindex) | Akar Penyebab Hilang | Rencana Aksi Koreksi |
|:---:|:---|:---:|:---:|:---:|:---|:---|
| 1 | `/toyota-camry/` |  |  |  |  | Aktifkan di Yoast & resubmit |
| 2 | `/honda-brv/` |  |  |  |  | Aktifkan di Yoast & resubmit |
| 3 | `/honda-mobilio/` |  |  |  |  | Aktifkan di Yoast & resubmit |
| 4 | `/seputar-rental-mobil-lombok/` |  |  |  |  | Aktifkan di Yoast & resubmit |
| 5 | `/sewa-mobil-mataram-harga-murah-kualitas-super-bagus/` |  |  |  |  | **Prioritas Utama (Halaman Uang)** |
| 6 | `/tips-memilih-sewa-mobil-lombok/` |  |  |  |  | Artikel pilar hasil migrasi |
| 7 | `/tips-menghitung-rincian-biaya-nonton-motogp-mandalika-2026/` |  |  |  |  | Artikel pilar event seasonal |

### Gate Hari 2 — Harus Hijau Sebelum Melangkah ke Hari 3

| # | Checkpoint Verifikasi Gate Hari 2 | Syarat Lolos (Pass Criteria) | Status Verifikasi |
|:---:|:---|:---|:---:|
| 1 | **Validasi Matriks 301** | 15/15 rule `301` tepat 1-hop, seluruh target merespons `content-type: text/html`. | [ ] Lolos |
| 2 | **Nol Redirect Ilegal** | 0 redirect ke media (`image/*`), 0 redirect ke homepage root (`/`). | [ ] Lolos |
| 3 | **Eliminasi Orphan Sitemap** | `comm -13` (URL ada di sitemap tapi tidak ada internal link dari homepage) = Kosong. | [ ] Lolos |
| 4 | **Eliminasi Link Homepage Tersembunyi** | `comm -23` (URL ada di homepage tapi tidak ada di sitemap) = Kosong. | [ ] Lolos |
| 5 | **Halaman Mataram Masuk Index List** | `/sewa-mobil-mataram-harga-murah-kualitas-super-bagus/` ada di sitemap **dan** di-link dari homepage. | [ ] Lolos |
| 6 | **Kanonikal Mandiri Bersih** | Semua halaman pemenang (KEEP) memiliki canonical self-referencing dan bebas dari tag `noindex`. | [ ] Lolos |

---

# HARI 3 — Sabtu, 24 Oktober 2026
## Tema: Schema yang Jujur, Lalu Serahkan ke Pengukuran

**Target Hari 3:** Schema bebas dari klaim palsu dan bebas error validasi, sitemap disubmit ulang ke GSC, baseline sebelum/sesudah terdokumentasi rapi.

### Blok A — 08.30–11.00 · Penyehatan Structured Data (Schema.org)

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D3-01** | **Hapus `aggregateRating` dari `AutoRental`.** Pilih opsi aman (audit §6.2) untuk mengeliminasi risiko manual action Google. **Dilarang** mendeploy `scripts/JSON-LD.json` mentah-mentah karena masih membawa rating 200 palsu. | Markup JSON-LD live tidak lagi memuat elemen `aggregateRating` dan `reviewCount`. | 45 m | DEV | Gate H2 |
| **D3-02** | **Perbaiki `BreadcrumbList`.** Tambahkan hierarki navigasi nyata minimal 2 tingkatan (`Beranda` → `Armada` → `Model`). Jika hierarki belum siap, hapus sementara blok breadcrumb agar tidak memicu error. | `BreadcrumbList` memiliki ≥2 `ListItem` valid, atau blok breadcrumb ditiadakan sementara. | 40 m | DEV | D3-01 |
| **D3-03** | **Sinkronkan `priceRange` = `Rp 300.000 - Rp 1.500.000`.** Ambil nilainya dari `scripts/JSON-LD.json` secara selektif (bagian harga sudah tepat), lalu tempel manual ke live markup. | JSON-LD live memuat batas bawah `300.000`; tidak ada lagi angka `250.000` di dalam structured data. | 20 m | DEV | D3-01 |
| **D3-04** | **Validasi schema live.** Jalankan uji di Google Rich Results Test & Schema Markup Validator untuk homepage + minimal 2 landing page armada. | 0 error validasi. `BreadcrumbList` valid, tidak ada peringatan fatal. Simpan bukti ke `scripts/baseline-22102026/`. | 30 m | SEO | D3-02, D3-03 |

> **Catatan `sameAs`:** Integrasi `sameAs` ke GBP sengaja ditunda sampai profil Google Business Profile resmi terverifikasi penuh.

### Blok B — 13.00–15.00 · Pembersihan Bug Markup & Eksekusi Indeks

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D3-05** | **Buru bug literal `' + imgSrc + '`.** Bug dipastikan **tidak** berasal dari `src/pages/` (hasil grep = 0), melainkan modul live plugin/theme builder. Cek elemen `<img class="blog-card__photo">`. **Batas waktu (timebox) 60 menit**. | Jika ditemukan: string `' + imgSrc + '` di HTML live hilang. Jika tidak ditemukan: catat plugin kandidat yang sudah dieliminasi ke backlog. | 60 m | DEV | — |
| **D3-06** | **Resubmit sitemap + Request Indexing 13 halaman KEEP.** Buka GSC → Sitemaps → submit ulang `sitemap_index.xml`. Lakukan URL Inspection → "Request indexing" berurutan untuk 13 URL pemenang. | Sitemap berstatus "Success" dengan jumlah URL baru. 13 request indexing tercatat rapi (sertakan screenshot). | 45 m | SEO | D3-04 |
| **D3-07** | **Uji reproduksi audit §12.** Jalankan 6 perintah verifikasi audit §12 terhadap live website hari ini untuk membuktikan perbaikan secara nyata. | 6/6 output tersimpan: cloaking bersih, kata kunci judi = 0, status 301 valid, content-type tepat, gap sitemap-homepage = 0. | 30 m | DEV | D3-06 |

### Blok C — 15.00–16.00 · Serah Terima & Dokumentasi Pengukuran

| ID | Microtask | Definisi Selesai (Definition of Done) | Est | Owner | Dep |
|:---:|:---|:---|:---:|:---:|:---:|
| **D3-08** | **Laporan sebelum vs sesudah 1 halaman.** Isi tabel metrik §5 dengan perbandingan angka nyata Hari 0 vs Hari 3. Tulis ringkasan: apa yang berubah, apa yang belum selesai, dan risiko yang tersisa. | Bagian §5 dokumen ini terisi lengkap dengan angka terverifikasi. | 30 m | SEO | D3-07 |
| **D3-09** | **Segel backlog Hari 4–30.** Pindahkan item di §6 ke kalender kerja mingguan (sertakan target tanggal, pemilik tugas, dan dependensi). | Seluruh task di §6 memiliki tanggal target pasti, bukan sekadar daftar wacana. | 30 m | SEO | D3-08 |

---

## 4. Analisis Risiko & Rencana Mitigasi

| # | Identifikasi Risiko | Peluang | Dampak | Strategi Mitigasi Teknis |
|:---:|:---|:---:|:---:|:---|
| 1 | **301 Matrix salah target → 404 massal** | Sedang | 🔴 Tinggi | D1-05 inventaris status dahulu; hanya 301 dari URL berstatus `200`; D2-03 verifikasi per kluster; backup D1-01 siap dipulihkan. |
| 2 | **Rule 301 ditulis sebelum list `200` fix** | Sedang | 🔴 Tinggi | Gate Hari 1 mewajibkan file `status-26-url.txt` ada dan valid sebelum masuk Hari 2. |
| 3 | **Perubahan Title menurunkan CTR singkat** | Rendah | 🟡 Rendah | Baseline CTR dicatat di D1-02; opsi rollback cepat via wp-admin (<1 menit) jika anomali berlanjut. |
| 4 | **Plugin WordPress menimpa `.htaccess`** | Sedang | 🟠 Sedang | Verifikasi hash `.htaccess` di akhir Hari 2; simpan cadangan `.htaccess.bak-22102026`. |
| 5 | **Bug `imgSrc` tidak ditemukan (theme vendor)** | Tinggi | 🟡 Rendah | Dibatasi waktu (timebox) 60 menit di D3-05; lanjut eksekusi tanpa menghambat peluncuran sitemap. |
| 6 | **Halaman pemenang (KEEP) ternyata `noindex`** | Rendah | 🔴 Tinggi | Gate Hari 2 mewajibkan inspeksi tag robots & canonical seluruh halaman KEEP. |
| 7 | **GSC lambat merespons request indexing** | Sedang | 🟠 Sedang | D3-06 dilakukan manual per URL; dokumentasikan screenshot status antrean GSC. |

> **Prosedur Pemulihan (Rollback Plan):** Restore penuh via backup Hostinger D1-01 (file + database) memakan waktu <30 menit. Untuk rollback selektif rule redirect, ganti file `.htaccess` aktif dengan salinan `.htaccess.bak-22102026`.

---

## 5. Matriks Baseline & Hasil Pengukuran (Wajib Diisi Saat Eksekusi)

| Parameter Metrik | Baseline Audit Lama (21 Sep 2026) | Baseline Hari 0 (22 Okt 2026) | Hasil Akhir Hari 3 (24 Okt 2026) | Target Hari ke-30 |
|:---|:---:|:---:|:---:|:---:|
| **Halaman Terindeks GSC** | 381 URL | 381 URL (per export GSC) | … | 390+ (berhenti turun) |
| **Crawled – Currently Not Indexed** | 651 URL | 651 URL (per export GSC) | … | <500 URL |
| **Redirect Rusak ke File Non-HTML** | 1 (Fortuner→JPEG) | 1 (Fortuner→JPEG live) | **0** | 0 |
| **Redirect Halaman Dalam ke Homepage** | 2 URL | 2 URL (Hiace & Rental live) | **0** | 0 |
| **Selisih Sitemap ↔ Homepage** | 12 + 7 URL | 12 + 7 URL | **0 + 0** | 0 |
| **Klaim `aggregateRating` Palsu** | 4.9 / 200 review | 4.9 / 200 review live | **Dihapus** | Dihapus / Data riil |
| **Konsistensi `priceRange` Schema** | Rp 250.000 | Rp 250.000 live | **Rp 300.000** | Rp 300.000 |
| **Validitas `BreadcrumbList`** | 1 item (invalid) | 1 item (invalid live) | **0 Error** | 0 Error |
| **Title Tag Homepage** | Tanpa "Lepas Kunci" | Tanpa "Lepas Kunci" live | **Dengan "Lepas Kunci"** | Terindeks di SERP |
| **Status `AdsBot` di robots.txt** | `Disallow: /` | `Disallow: /` live | **Dihapus (Open)** | Dihapus (Open) |
| **Status Pemrosesan Sitemap di GSC** | — | — | **Success** | Success |

> **Catatan Pengisian:** Kolom **Hari 3** HANYA boleh diisi berdasarkan hasil verifikasi perintah terminal nyata, bukan klaim verbal.

---

## 6. Backlog Kerja Terjadwal (Hari ke-4 s/d Hari ke-30)

| Tingkat Urgensi | Item Tugas Backlog | Alasan Ditunda dari Rencana 3 Hari | Target Penyelesaian | Penanggung Jawab |
|:---:|:---|:---|:---:|:---:|
| 🔴 Tinggi | **301 Innova Zenix** (`-g` + `-q` ➔ halaman gabungan baru) | Menunggu pembuatan halaman kanonis baru dengan konten komparasi trim G vs Q. | H-7 | DEV + SEO |
| 🔴 Tinggi | **Klasifikasi 513 Post Blog:** Keep / Merge / `noindex` / 410 (P1-2) | Membutuhkan waktu audit 2 minggu dan tidak boleh berjalan paralel dengan 301 matrix. | Mulai H-7, Selesai H-21 | SEO |
| 🟠 Sedang | **Ratakan 117 Redirect Lama + 106 URL 404** (P1-3, P1-4) | Membutuhkan export data riil URL 404 dan redirect error dari Google Search Console. | H-10 | DEV |
| 🟠 Sedang | **Audit 135 `noindex` + 70 URL Diblokir robots.txt** (P1-6, P1-7) | Membutuhkan export laporan Coverage GSC secara mendalam dari pemilik akun. | H-10 | SEO |
| 🟠 Sedang | **Pembuatan Halaman Penulis & Bio E-E-A-T** (P1-8) | Perlu penyusunan profil penulis kredibel bidang pariwisata Lombok. | H-14 | SEO |
| 🟡 Rendah | **Penambahan Parameter `sameAs` ke GBP** | Menunggu profil Google Business Profile terverifikasi 100%. | H-14 | DEV |
| 🟡 Rendah | **Buka Akses Bot AI (`GPTBot` / `CCBot`)** (P2-5) | Merupakan keputusan strategi konten AI, bukan kondisi darurat teknis. | H-21 | USER + SEO |
| 🟡 Rendah | **Koreksi Kode Bandara "ZAM" ➔ "LOP"** (P2-8) | Penyesuaian kredibilitas faktual nama bandara resmi di halaman web & schema. | H-21 | SEO |
| 🟡 Rendah | **Tinjau Header `vary: User-Agent` & Caching** (P2-6) | Butuh pengujian cache menyeluruh di server agar tidak merusak tampilan live. | H-21 | DEV |
| ⚪ Masa Depan | **Ekstrak 170 KB Inline CSS Tema** (P2-1) | Berisiko memicu visual regression pada tema sebelum struktur halaman stabil. | H-45 | DEV |
| ⚪ Masa Depan | **Deploy Komponen `src/stitch/` Penuh** (P2-4) | Dilarang dideploy sebelum konsolidasi URL dan pengindeksan ulang Google stabil. | H-45+ | DEV |

---

## 7. Tolok Ukur Keberhasilan 3 Hari Kerja

Bukan "posisi ranking langsung naik ke Top 1". Tolok ukur yang obyektif, realistis, dan dapat dibuktikan per Sabtu sore adalah:

### A. Lima Bukti Keberhasilan Teknis (Sabtu Sore)

| # | Indikator Keberhasilan | Target Kondisi Riil | Cara Membuktikan |
|:---:|:---|:---|:---|
| 1 | **Nol Redirect Rusak** | Tidak ada lagi URL yang me-redirect ke file gambar atau terlempar ke homepage. | Uji cURL loop menghasilkan header `301` langsung ke URL target `text/html`. |
| 2 | **Konsistensi Peta URL** | Sitemap XML dan internal link homepage merujuk pada daftar URL armada yang persis sama. | Output perintah `comm -13` dan `comm -23` sama dengan 0. |
| 3 | **Struktur Schema Jujur** | Manipulasi 200 review palsu hilang, rentang harga Rp300.000 akurat, breadcrumb valid. | Google Rich Results Test menunjukkan status 0 Error & 0 Peringatan. |
| 4 | **Kepastian Sinyal Kanonis** | 13 kluster armada memiliki satu URL pemenang mutlak di mata Googlebot. | 15 rule 301 aktif 1-hop dan seluruh halaman KEEP bersatus self-canonical. |
| 5 | **Basis Data Baseline Terkunci** | Dokumentasi metrik Hari 0 tersimpan lengkap sebagai pembanding evaluasi 30 hari ke depan. | Tabel §5 terisi penuh dengan data riil per 22 Oktober 2026. |

### B. Ekspektasi Realistis: Yang Tidak Akan Terjadi dalam 3 Hari Ini

| Kondisi | Ekspektasi Salah | Realitas Algoritma Google |
|:---|:---|:---|
| **Pergerakan Ranking** | "Ranking langsung naik ke halaman 1 Google" | Butuh waktu 2–6 minggu bagi Googlebot untuk merayapi ulang 15 redirect dan mereevaluasi otoritas halaman. |
| **Jumlah Indeks GSC** | "Angka Crawled - Currently Not Indexed langsung 0" | Google Search Console memperbarui data laporan Coverage secara bertahap dalam siklus mingguan. |
| **Impresi Organik** | "Tayangan pencarian langsung melonjak 2.000/hari" | Pemulihan impresi pasca-devaluasi malware membutuhkan akumulasi sinyal stabil selama 30–60 hari. |
