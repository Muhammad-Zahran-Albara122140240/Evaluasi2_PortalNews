Nama    : Muhammad Zahran Albara
NIM     : 122140240

# 📰 News Portal App

Aplikasi Portal berita dengan fitur login aman, pemilihan sumber berita, dan tampilan detail berita hasil scraping. Proyek ini memanfaatkan OAuth2 melalui Google Cloud untuk otentikasi pengguna, serta mengintegrasikan beberapa sumber berita dalam satu platform sederhana.

---

## 🚀 Fitur Utama

### 🔐 1. Login dengan Google (OAuth2)
- Sistem login yang aman menggunakan **OAuth2**.
- Terintegrasi langsung dengan **Google Cloud OAuth** untuk kemudahan akses dan keamanan data pengguna.

### 🗞️ 2. News Selection
- Pengguna dapat memilih **sumber berita** dari 3 portal yang tersedia.
- Berita akan ditampilkan sesuai sumber yang dipilih.

### 📋 3. Daftar Berita
- Menampilkan **list berita** yang telah di-*scrape* dari situs web berita.
- Berita ditampilkan secara ringkas, menampilkan judul, waktu, dan ringkasan singkat.

### 📄 4. Detail Berita
- Halaman khusus yang menampilkan **isi lengkap berita** hasil scraping.
- Dapat diakses dengan klik salah satu item dari daftar berita.

---

## ⚙️ Teknologi yang Digunakan

- **Next.js** / **React** (frontend modern)
- **OAuth2** melalui Google Cloud
- **Web scraping** (untuk pengambilan berita)

---

## 🏁 Cara Menjalankan Proyek

```bash
# Clone repository
git clone https://github.com/username/nama-repo.git
cd nama-repo

# Install dependencies
npm install

# Jalankan aplikasi (contoh untuk Next.js)
npm run dev
