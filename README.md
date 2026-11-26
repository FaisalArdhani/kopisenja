# Kopi Senja

Landing page sederhana untuk kedai kopi Kopi Senja. Website dibuat menggunakan HTML, CSS, dan JavaScript vanilla tanpa framework, library, atau backend.

## Fitur

- Navbar responsif dengan menu hamburger dan efek saat halaman digulir.
- Hero dengan gambar latar parallax di desktop.
- Daftar menu minuman dan makanan pendamping yang dibuat dari data JavaScript.
- Filter menu berdasarkan kategori: Espresso Based, Susu, Manual Brew, dan Makanan.
- Keranjang pesanan dengan kontrol jumlah, hapus item, dan total harga.
- Pilihan pesanan Dine-in atau Takeaway untuk satu keranjang.
- Dine-in meminta nomor meja; Takeaway meminta nama pemesan.
- Isi keranjang disimpan di `localStorage` dan tetap tersedia setelah halaman dimuat ulang.
- Tombol pesan menyusun rincian pesanan dan membukanya sebagai draft WhatsApp.
- Animasi saat konten masuk viewport, active link navbar, tombol kembali ke atas, dan peta Google Maps.
- Tampilan responsif dan dukungan `prefers-reduced-motion`.

## Isi menu

**Minuman:** Espresso, Americano, Kopi Susu, Latte, V60, dan Es Kopi Gula Aren.

**Makanan:** Roti Bakar Cokelat, Croissant Mentega, Chocolate Croissant, Brownies Cokelat, dan Sandwich Ayam.

## Struktur folder

```text
.
├── index.html
├── README.md
└── src
    ├── asset
    │   └── coffe.jpeg
    ├── js
    │   └── script.js
    └── style
        └── style.css
```

Pastikan nama gambar tetap `coffe.jpeg`. CSS memanggilnya dengan path `../asset/coffe.jpeg` karena file CSS berada di `src/style/`.

## Menjalankan secara lokal

Tidak perlu memasang dependensi. Dari folder proyek, jalankan server lokal:

```bash
python -m http.server 8000
```

Kemudian buka [http://localhost:8000](http://localhost:8000) di browser. Alternatifnya, buka `index.html` langsung.

Poppins dimuat dari Google Fonts dan peta memakai Google Maps Embed, sehingga fitur tersebut memerlukan koneksi internet.

## Mengubah data kedai

- **Menu dan harga:** ubah array `dataMenu` di `src/js/script.js`.
- **Nomor WhatsApp untuk pesanan:** ubah konstanta `nomorWhatsApp` di `src/js/script.js` dengan kode negara tanpa tanda `+` atau spasi. Nomor yang sekarang dikonfigurasi adalah `6289669326628`.
- **Informasi kontak yang ditampilkan:** ubah alamat, nomor WhatsApp, Instagram, dan jam buka di bagian `id="contact"` dalam `index.html`.
- **Lokasi peta:** ubah alamat pada URL iframe Google Maps di bagian Contact pada `index.html`.
- **Gambar hero:** ganti file `src/asset/coffe.jpeg` atau sesuaikan path gambar di `src/style/style.css`.

## Alur pemesanan

1. Tambahkan menu pertama, lalu pilih Dine-in atau Takeaway.
2. Untuk Dine-in, masukkan nomor meja. Untuk Takeaway, masukkan nama pemesan.
3. Item berikutnya mengikuti jenis pesanan dan identitas yang sudah dipilih untuk keranjang.
4. Buka keranjang untuk mengatur jumlah item atau menghapusnya.
5. Pilih **Pesan via WhatsApp** untuk membuka draft berisi daftar item dan total. Setelah draft berhasil dibuka, keranjang dikosongkan; pesan tetap perlu dikirim dari WhatsApp.
