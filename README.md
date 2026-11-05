# Kopi Senja

Landing page sederhana untuk kedai kopi Kopi Senja. Dibuat dengan HTML, CSS, dan JavaScript vanilla tanpa framework atau library.

## Fitur

- Navbar transparan di bagian hero dan berubah latar setelah halaman digulir.
- Menu hamburger responsif dengan animasi buka dan tutup.
- Hero dengan gambar latar, overlay, dan tombol menuju menu.
- Daftar enam minuman kopi.
- Bagian tentang kedai, jam buka, kontak, dan footer.
- Tampilan responsif untuk desktop dan perangkat seluler.

## Struktur folder

```text
.
├── index.html
└── src
    ├── asset
    │   └── coffe.jpeg
    ├── js
    │   └── script.js
    └── style
        └── style.css
```

## Menjalankan secara lokal

Tidak perlu memasang dependensi. Buka `index.html` langsung di browser, atau jalankan server lokal dari folder proyek:

```bash
python -m http.server 8000
```

Lalu buka [http://localhost:8000](http://localhost:8000).

Font Poppins dimuat dari Google Fonts, sehingga koneksi internet diperlukan untuk menampilkannya. Gambar hero sudah tersedia di `src/asset/coffe.jpeg`; path-nya dipanggil dari CSS sebagai `../asset/coffe.jpeg`.

## Bagian halaman

- **Home:** hero dengan gambar, deskripsi kedai, dan tombol “Lihat Menu”.
- **Menu:** Espresso, Americano, Kopi Susu, Latte, V60, dan Es Kopi Gula Aren.
- **About:** cerita singkat dan jam buka.
- **Contact:** alamat, jam buka, WhatsApp, dan Instagram.

Sesuaikan alamat dan informasi kontak di bagian `id="contact"` pada `index.html` dengan data kedai yang benar.
