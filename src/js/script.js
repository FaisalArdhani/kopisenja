const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");
const daftarMenu = document.querySelector("#daftar-menu");
const filterMenu = document.querySelector("#filter-menu");
const isiKeranjang = document.querySelector("#isi-keranjang");
const panelKeranjang = document.querySelector("#panel-keranjang");
const lapisanKeranjang = document.querySelector("#lapisan-keranjang");
const tombolBukaKeranjang = document.querySelector("#buka-keranjang");
const tombolTutupKeranjang = document.querySelector("#tutup-keranjang");
const tombolPesan = document.querySelector("#tombol-pesan");
const statusPesanan = document.querySelector("#status-pesanan");
const jenisKeranjang = document.querySelector("#jenis-keranjang");
const tombolAtas = document.querySelector("#tombol-atas");
const dialogMeja = document.querySelector("#dialog-meja");
const dialogJenis = document.querySelector("#dialog-jenis");
const dialogNama = document.querySelector("#dialog-nama");
const formMeja = document.querySelector("#form-meja");
const formNama = document.querySelector("#form-nama");
const inputMeja = document.querySelector("#nomor-meja");
const inputNama = document.querySelector("#nama-pemesan");
const deskripsiDialogMeja = document.querySelector("#deskripsi-dialog-meja");
const deskripsiDialogJenis = document.querySelector("#deskripsi-dialog-jenis");
const deskripsiDialogNama = document.querySelector("#deskripsi-dialog-nama");
const pesanErrorMeja = document.querySelector("#pesan-error-meja");
const pesanErrorNama = document.querySelector("#pesan-error-nama");
const tombolDineIn = document.querySelector("#pilih-dinein");
const tombolTakeaway = document.querySelector("#pilih-takeaway");
const nomorWhatsApp = "6289669326628";

// BARU: data menu kedai
const dataMenu = [
  {
    id: "espresso",
    nama: "Espresso",
    deskripsi: "Kopi pekat dengan rasa yang kuat.",
    harga: 18000,
    kategori: "Espresso Based",
  },
  {
    id: "americano",
    nama: "Americano",
    deskripsi: "Espresso dengan tambahan air hangat.",
    harga: 20000,
    kategori: "Espresso Based",
  },
  {
    id: "kopi-susu",
    nama: "Kopi Susu",
    deskripsi: "Perpaduan kopi, susu, dan rasa manis ringan.",
    harga: 22000,
    kategori: "Susu",
  },
  {
    id: "latte",
    nama: "Latte",
    deskripsi: "Espresso lembut dengan susu steamed.",
    harga: 24000,
    kategori: "Susu",
  },
  {
    id: "v60",
    nama: "V60",
    deskripsi: "Kopi seduh manual dengan karakter biji pilihan.",
    harga: 25000,
    kategori: "Manual Brew",
  },
  {
    id: "es-kopi-gula-aren",
    nama: "Es Kopi Gula Aren",
    deskripsi: "Kopi dingin dengan susu dan gula aren.",
    harga: 23000,
    kategori: "Susu",
  },
  // BARU: makanan pendamping kopi
  {
    id: "roti-bakar-cokelat",
    nama: "Roti Bakar Cokelat",
    deskripsi: "Roti panggang dengan olesan cokelat.",
    harga: 18000,
    kategori: "Makanan",
  },
  {
    id: "croissant-mentega",
    nama: "Croissant Mentega",
    deskripsi: "Pastri berlapis dengan aroma mentega.",
    harga: 22000,
    kategori: "Makanan",
  },
  {
    id: "Chocolate-Croissant",
    nama: "Chocolate Croissant",
    deskripsi: "Didalam roti nya dilumuri dengan cokelat.",
    harga: 20000,
    kategori: "Makanan",
  },
  {
    id: "brownies-cokelat",
    nama: "Brownies Cokelat",
    deskripsi: "Brownies cokelat dengan tekstur lembut.",
    harga: 18000,
    kategori: "Makanan",
  },
  {
    id: "sandwich-ayam",
    nama: "Sandwich Ayam",
    deskripsi: "Roti lapis isi ayam, selada, dan saus.",
    harga: 28000,
    kategori: "Makanan",
  },
];

let keranjang = [];
let pengamatAnimasi;
let aksiMejaTertunda = null;
let aksiJenisTertunda = null;
let aksiNamaTertunda = null;

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();

hamburger.addEventListener("click", () => {
  const isActive = menu.classList.toggle("active");
  hamburger.classList.toggle("active", isActive);
  hamburger.setAttribute("aria-expanded", isActive);
  hamburger.setAttribute("aria-label", isActive ? "Tutup menu" : "Buka menu");
});

// BARU: format harga dalam Rupiah.
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

// BARU: render kartu menu sesuai kategori yang dipilih.
function renderMenu(kategori = "Semua") {
  daftarMenu.replaceChildren();

  for (const item of dataMenu) {
    if (kategori !== "Semua" && item.kategori !== kategori) continue;

    const kartu = document.createElement("article");
    kartu.className = "card animasi-scroll";
    kartu.dataset.id = item.id;

    const nama = document.createElement("h3");
    nama.textContent = item.nama;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = item.deskripsi;

    const aksi = document.createElement("div");
    aksi.className = "card-aksi";

    const harga = document.createElement("span");
    harga.textContent = formatRupiah(item.harga);

    const tombolTambah = document.createElement("button");
    tombolTambah.className = "tombol-tambah";
    tombolTambah.type = "button";
    tombolTambah.dataset.tambah = item.id;
    tombolTambah.textContent = "Tambah";

    aksi.append(harga, tombolTambah);
    kartu.append(nama, deskripsi, aksi);
    daftarMenu.append(kartu);
    amatiElemen(kartu);
  }
}

// BARU: gambar isi keranjang, jumlah, dan total.
function renderKeranjang() {
  isiKeranjang.replaceChildren();

  if (keranjang.length === 0) {
    const kosong = document.createElement("p");
    kosong.className = "kosong-keranjang";
    kosong.textContent = "Keranjang masih kosong";
    isiKeranjang.append(kosong);
    jenisKeranjang.textContent =
      "Pilih Dine-in atau Takeaway saat menambahkan item pertama.";
  } else {
    const jenisAktif = jenisPesananKeranjang();
    if (jenisAktif === "dine-in") {
      jenisKeranjang.textContent =
        `Jenis pesanan: Dine-in · Meja ${keranjang[0].nomorMeja}`;
    } else if (jenisAktif === "takeaway") {
      jenisKeranjang.textContent =
        `Jenis pesanan: Takeaway · Atas nama ${keranjang[0].namaPemesan}`;
    } else {
      jenisKeranjang.textContent =
        "Gunakan satu jenis pesanan dan satu meja untuk seluruh keranjang.";
    }
  }

  for (const item of keranjang) {
    const baris = document.createElement("article");
    baris.className = "item-keranjang";

    const detail = document.createElement("div");
    const nama = document.createElement("h3");
    nama.textContent = item.nama;
    const jenis = document.createElement("p");
    if (item.jenisPesanan === "dine-in") {
      jenis.textContent = item.nomorMeja === null
        ? "Dine-in · meja belum dipilih"
        : `Dine-in · Meja ${item.nomorMeja}`;
    } else {
      jenis.textContent = item.jenisPesanan === "takeaway"
        ? item.namaPemesan
          ? `Takeaway · Atas nama ${item.namaPemesan}`
          : "Takeaway · nama belum diisi"
        : "Jenis pesanan belum dipilih";
    }
    const harga = document.createElement("p");
    harga.textContent = formatRupiah(item.harga * item.jumlah);

    const kontrol = document.createElement("div");
    kontrol.className = "kontrol-jumlah";
    kontrol.append(
      buatTombolJumlah(
        "Kurangi jumlah",
        "-",
        "kurang",
        item.id,
        item.jenisPesanan,
        item.nomorMeja,
        item.namaPemesan,
      ),
    );
    const jumlah = document.createElement("span");
    jumlah.textContent = String(item.jumlah);
    kontrol.append(jumlah);
    kontrol.append(
      buatTombolJumlah(
        "Tambah jumlah",
        "+",
        "tambah",
        item.id,
        item.jenisPesanan,
        item.nomorMeja,
        item.namaPemesan,
      ),
    );
    detail.append(nama, jenis, harga, kontrol);

    const hapus = buatTombolJumlah(
      "Hapus " + item.nama,
      "Hapus",
      "hapus",
      item.id,
      item.jenisPesanan,
      item.nomorMeja,
      item.namaPemesan,
    );
    hapus.className = "hapus-item";
    baris.append(detail, hapus);
    isiKeranjang.append(baris);
  }

  const total = keranjang.reduce(jumlahkanHarga, 0);
  document.querySelector("#total-keranjang").textContent = formatRupiah(total);
  document.querySelector("#jumlah-keranjang").textContent = String(
    keranjang.reduce(jumlahkanJumlah, 0),
  );
  tombolPesan.disabled = keranjang.length === 0;
}

// BARU: periksa apakah semua item cocok untuk satu pesanan.
function jenisPesananKeranjang() {
  let jenis = null;
  let nomorMeja = null;
  let namaPemesan = null;
  let belumLengkap = false;

  for (const item of keranjang) {
    if (item.jenisPesanan === null) {
      belumLengkap = true;
      continue;
    }
    if (jenis !== null && jenis !== item.jenisPesanan) return "campuran";
    jenis = item.jenisPesanan;

    if (jenis === "dine-in") {
      if (item.nomorMeja === null) {
        belumLengkap = true;
      } else if (nomorMeja !== null && nomorMeja !== item.nomorMeja) {
        return "campuran";
      } else {
        nomorMeja = item.nomorMeja;
      }
      if (item.namaPemesan !== null) return "campuran";
    } else {
      if (item.nomorMeja !== null) return "campuran";
      if (!item.namaPemesan) {
        belumLengkap = true;
      } else if (namaPemesan !== null && namaPemesan !== item.namaPemesan) {
        return "campuran";
      } else {
        namaPemesan = item.namaPemesan;
      }
    }
  }

  if (belumLengkap || jenis === null) return "belum";
  return jenis;
}

// BARU: jumlahkan nilai semua produk di keranjang.
function jumlahkanHarga(total, item) {
  return total + item.harga * item.jumlah;
}

// BARU: jumlahkan kuantitas untuk counter navbar.
function jumlahkanJumlah(total, item) {
  return total + item.jumlah;
}

// BARU: buat tombol aksi jumlah item keranjang.
function buatTombolJumlah(
  label,
  teks,
  aksi,
  id,
  jenisPesanan,
  nomorMeja,
  namaPemesan,
) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.setAttribute("aria-label", label);
  tombol.dataset.aksi = aksi;
  tombol.dataset.id = id;
  tombol.dataset.jenisPesanan = jenisPesanan || "";
  tombol.dataset.meja = nomorMeja === null ? "" : String(nomorMeja);
  tombol.dataset.namaPemesan = namaPemesan || "";
  tombol.textContent = teks;
  return tombol;
}

// BARU: simpan keranjang di penyimpanan browser.
function simpanKeranjang() {
  try {
    localStorage.setItem("kopi-senja-keranjang", JSON.stringify(keranjang));
  } catch (error) {
    console.error("Keranjang tidak dapat disimpan di localStorage:", error);
  }
}

// BARU: muat dan periksa data keranjang tersimpan.
function muatKeranjang() {
  try {
    const tersimpan = localStorage.getItem("kopi-senja-keranjang");
    if (!tersimpan) return;

    const dataTersimpan = JSON.parse(tersimpan);
    if (!Array.isArray(dataTersimpan)) {
      throw new Error("Format data keranjang tidak valid.");
    }

    for (const item of dataTersimpan) {
      const menuTersedia = cariProduk(item.id);
      if (
        menuTersedia &&
        Number.isInteger(item.jumlah) &&
        item.jumlah > 0
      ) {
        const nomorMejaValid =
          Number.isInteger(item.nomorMeja) && item.nomorMeja > 0;
        const jenisPesanan =
          item.jenisPesanan === "dine-in" || item.jenisPesanan === "takeaway"
            ? item.jenisPesanan
            : nomorMejaValid
              ? "dine-in"
              : null;
        const namaPemesan =
          jenisPesanan === "takeaway" &&
          typeof item.namaPemesan === "string" &&
          item.namaPemesan.trim().length <= 60 &&
          item.namaPemesan.trim().length > 0
            ? item.namaPemesan.trim()
            : null;
        keranjang.push({
          id: menuTersedia.id,
          nama: menuTersedia.nama,
          harga: menuTersedia.harga,
          jumlah: item.jumlah,
          jenisPesanan,
          nomorMeja: jenisPesanan === "dine-in" && nomorMejaValid
            ? item.nomorMeja
            : null,
          namaPemesan,
        });
      }
    }
  } catch (error) {
    console.error("Data keranjang gagal dibaca:", error);
    keranjang = [];
  }
}

// BARU: cari data menu berdasarkan id.
function cariProduk(id) {
  for (const produk of dataMenu) {
    if (produk.id === id) return produk;
  }
  return null;
}

// BARU: cari item yang sudah ada di keranjang.
function cariItemKeranjang(id, jenisPesanan, nomorMeja, namaPemesan) {
  for (const item of keranjang) {
    if (
      item.id === id &&
      item.jenisPesanan === jenisPesanan &&
      item.nomorMeja === nomorMeja &&
      item.namaPemesan === namaPemesan
    ) {
      return item;
    }
  }
  return null;
}

// BARU: pilih cara pesanan untuk item yang akan ditambahkan.
function bukaDialogJenis(id = null, item = null) {
  aksiJenisTertunda = item
    ? { jenis: "atur-lama", item }
    : { jenis: "tambah", id };
  deskripsiDialogJenis.textContent = item
    ? `Pilih cara pesanan untuk ${item.nama} yang sudah ada di keranjang.`
    : "Pilih apakah pesanan akan dinikmati di tempat atau dibawa pulang.";
  dialogJenis.showModal();
}

// BARU: buka dialog nomor meja untuk pesanan dine-in.
function bukaDialogMeja(jenis, id = null, item = null) {
  aksiMejaTertunda = { jenis, id, item };
  inputMeja.value = "";
  pesanErrorMeja.textContent = "";

  if (jenis === "tambah") {
    const produk = cariProduk(id);
    deskripsiDialogMeja.textContent =
      `Masukkan nomor meja untuk pesanan dine-in ${produk.nama}.`;
  } else {
    deskripsiDialogMeja.textContent =
      `Pilih nomor meja untuk ${item.nama} yang ada di keranjang.`;
  }

  dialogMeja.showModal();
  inputMeja.focus();
}

// BARU: buka dialog nama untuk pesanan Takeaway.
function bukaDialogNama(jenis, id = null, item = null) {
  aksiNamaTertunda = { jenis, id, item };
  inputNama.value = "";
  pesanErrorNama.textContent = "";
  deskripsiDialogNama.textContent = jenis === "tambah"
    ? `Masukkan nama untuk pesanan ${cariProduk(id).nama} yang dibawa pulang.`
    : "Masukkan nama pemesan untuk melengkapi pesanan Takeaway.";
  dialogNama.showModal();
  inputNama.focus();
}

// BARU: simpan nomor meja yang dikirim dari dialog.
function simpanNomorMeja(event) {
  event.preventDefault();
  if (!inputMeja.checkValidity()) {
    pesanErrorMeja.textContent = "Masukkan nomor meja berupa angka lebih dari 0.";
    inputMeja.focus();
    return;
  }

  const nomorMeja = inputMeja.valueAsNumber;
  const aksi = aksiMejaTertunda;
  if (!aksi) return;

  if (aksi.jenis === "atur-lama" && !nomorMejaCocokDenganKeranjang(nomorMeja, aksi.item)) {
    pesanErrorMeja.textContent =
      "Gunakan nomor meja yang sama dengan item Dine-in lain di keranjang.";
    inputMeja.focus();
    return;
  }

  aksiMejaTertunda = null;
  dialogMeja.close();

  if (aksi.jenis === "tambah") {
    tambahKeKeranjang(aksi.id, "dine-in", nomorMeja);
    return;
  }

  for (const item of keranjang) {
    if (
      item === aksi.item ||
      item.jenisPesanan === null ||
      (item.jenisPesanan === "dine-in" && item.nomorMeja === null)
    ) {
      item.jenisPesanan = "dine-in";
      item.nomorMeja = nomorMeja;
      item.namaPemesan = null;
    }
  }
  simpanKeranjang();
  renderKeranjang();
  pesanViaWhatsApp();
}

// BARU: simpan pilihan dine-in atau lanjutkan tanpa nomor meja.
function pilihJenisPesanan(jenisPesanan) {
  const aksi = aksiJenisTertunda;
  if (!aksi) return;

  aksiJenisTertunda = null;
  dialogJenis.close();

  if (aksi.jenis === "tambah") {
    if (jenisPesanan === "dine-in") {
      bukaDialogMeja("tambah", aksi.id);
    } else {
      bukaDialogNama("tambah", aksi.id);
    }
    return;
  }

  if (!bolehPilihJenisUntukKeranjang(jenisPesanan, aksi.item)) {
    tampilkanPeringatanPesanan();
    return;
  }

  if (jenisPesanan === "dine-in") {
    bukaDialogMeja("atur-lama", null, aksi.item);
    return;
  }

  for (const item of keranjang) {
    if (item === aksi.item || item.jenisPesanan === null) {
      item.jenisPesanan = "takeaway";
      item.nomorMeja = null;
      item.namaPemesan = null;
    }
  }
  simpanKeranjang();
  renderKeranjang();
  bukaDialogNama("atur-lama", null, aksi.item);
}

// BARU: pastikan pilihan jenis sama dengan item yang sudah ditetapkan.
function bolehPilihJenisUntukKeranjang(jenisPesanan, itemDiabaikan) {
  for (const item of keranjang) {
    if (item === itemDiabaikan || item.jenisPesanan === null) continue;
    if (item.jenisPesanan !== jenisPesanan) return false;
  }
  return true;
}

// BARU: pastikan nomor meja tetap sama dalam satu pesanan Dine-in.
function nomorMejaCocokDenganKeranjang(nomorMeja, itemDiabaikan) {
  for (const item of keranjang) {
    if (
      item !== itemDiabaikan &&
      item.jenisPesanan === "dine-in" &&
      item.nomorMeja !== null &&
      item.nomorMeja !== nomorMeja
    ) {
      return false;
    }
  }
  return true;
}

// BARU: pilih pesanan dine-in.
function pilihDineIn() {
  pilihJenisPesanan("dine-in");
}

// BARU: pilih pesanan takeaway.
function pilihTakeaway() {
  pilihJenisPesanan("takeaway");
}

// BARU: batalkan pilihan jenis pesanan.
function batalPilihanJenis() {
  aksiJenisTertunda = null;
  dialogJenis.close();
}

// BARU: tangani Escape pada dialog jenis pesanan.
function tanganiEscapeDialogJenis(event) {
  event.preventDefault();
  batalPilihanJenis();
}

// BARU: batalkan dialog tanpa menambah atau memesan item.
function batalDialogMeja() {
  aksiMejaTertunda = null;
  dialogMeja.close();
}

// BARU: tangani tombol Escape saat dialog meja terbuka.
function tanganiEscapeDialogMeja(event) {
  event.preventDefault();
  batalDialogMeja();
}

// BARU: simpan nama pemesan untuk keranjang Takeaway.
function simpanNamaPemesan(event) {
  event.preventDefault();
  const namaPemesan = inputNama.value.trim();
  if (!inputNama.checkValidity() || namaPemesan.length === 0) {
    pesanErrorNama.textContent = "Nama pemesan perlu diisi.";
    inputNama.focus();
    return;
  }

  const aksi = aksiNamaTertunda;
  if (!aksi) return;
  if (
    aksi.jenis !== "tambah" &&
    !bolehPilihJenisUntukKeranjang("takeaway", aksi.item)
  ) {
    aksiNamaTertunda = null;
    dialogNama.close();
    tampilkanPeringatanPesanan();
    return;
  }

  aksiNamaTertunda = null;
  dialogNama.close();

  if (aksi.jenis === "tambah") {
    tambahKeKeranjang(aksi.id, "takeaway", null, namaPemesan);
    return;
  }

  for (const item of keranjang) {
    if (
      item === aksi.item ||
      (item.jenisPesanan === "takeaway" && !item.namaPemesan)
    ) {
      item.jenisPesanan = "takeaway";
      item.nomorMeja = null;
      item.namaPemesan = namaPemesan;
    }
  }
  simpanKeranjang();
  renderKeranjang();
  pesanViaWhatsApp();
}

// BARU: batalkan dialog nama tanpa menambahkan pesanan.
function batalDialogNama() {
  aksiNamaTertunda = null;
  dialogNama.close();
}

// BARU: tangani Escape pada dialog nama.
function tanganiEscapeDialogNama(event) {
  event.preventDefault();
  batalDialogNama();
}

// BARU: tambah produk ke keranjang sesuai nomor meja.
function tambahKeKeranjang(id, jenisPesanan, nomorMeja, namaPemesan = null) {
  const produk = cariProduk(id);
  if (!produk) return;

  if (
    keranjang.length > 0 &&
    (jenisPesananKeranjang() !== jenisPesanan ||
      (jenisPesanan === "dine-in" &&
        keranjang[0].nomorMeja !== nomorMeja) ||
      (jenisPesanan === "takeaway" &&
        keranjang[0].namaPemesan !== namaPemesan))
  ) {
    tampilkanPeringatanPesanan();
    return;
  }

  statusPesanan.textContent = "";
  const itemAda = cariItemKeranjang(id, jenisPesanan, nomorMeja, namaPemesan);
  if (itemAda) {
    itemAda.jumlah += 1;
  } else {
    keranjang.push({
      id: produk.id,
      nama: produk.nama,
      harga: produk.harga,
      jumlah: 1,
      jenisPesanan,
      nomorMeja,
      namaPemesan,
    });
  }

  simpanKeranjang();
  renderKeranjang();
}

// BARU: ubah jumlah item atau hapus saat jumlah mencapai nol.
function ubahJumlahKeranjang(id, jenisPesanan, nomorMeja, namaPemesan, perubahan) {
  const item = cariItemKeranjang(id, jenisPesanan, nomorMeja, namaPemesan);
  if (!item) return;

  item.jumlah += perubahan;
  if (item.jumlah <= 0) {
    keranjang = daftarTanpaItem(
      keranjang,
      id,
      jenisPesanan,
      nomorMeja,
      namaPemesan,
    );
  }
  simpanKeranjang();
  renderKeranjang();
}

// BARU: hapus produk dari keranjang.
function hapusDariKeranjang(id, jenisPesanan, nomorMeja, namaPemesan) {
  keranjang = daftarTanpaItem(
    keranjang,
    id,
    jenisPesanan,
    nomorMeja,
    namaPemesan,
  );
  simpanKeranjang();
  renderKeranjang();
}

// BARU: buat daftar baru tanpa produk yang dipilih.
function daftarTanpaItem(daftar, id, jenisPesanan, nomorMeja, namaPemesan) {
  const hasil = [];
  for (const item of daftar) {
    if (
      item.id !== id ||
      item.jenisPesanan !== jenisPesanan ||
      item.nomorMeja !== nomorMeja ||
      item.namaPemesan !== namaPemesan
    ) {
      hasil.push(item);
    }
  }
  return hasil;
}

// BARU: jelaskan penolakan saat keranjang berisi mode lain.
function tampilkanPeringatanPesanan() {
  const jenisAktif = jenisPesananKeranjang();
  if (jenisAktif === "dine-in") {
    statusPesanan.textContent =
      `Keranjang ini hanya untuk Dine-in meja ${keranjang[0].nomorMeja}. Hapus item terlebih dahulu untuk mengganti jenis pesanan.`;
  } else if (jenisAktif === "takeaway") {
    statusPesanan.textContent =
      "Keranjang ini hanya untuk Takeaway. Hapus item terlebih dahulu untuk mengganti jenis pesanan.";
  } else {
    statusPesanan.textContent =
      "Keranjang hanya boleh berisi satu jenis pesanan dan satu meja. Hapus item yang berbeda sebelum melanjutkan.";
  }
  bukaPanelKeranjang();
}

// BARU: buka panel dan pindahkan fokus ke tombol tutup.
function bukaPanelKeranjang() {
  panelKeranjang.classList.add("buka");
  panelKeranjang.setAttribute("aria-hidden", "false");
  panelKeranjang.removeAttribute("inert");
  tombolBukaKeranjang.setAttribute("aria-expanded", "true");
  lapisanKeranjang.hidden = false;
  document.body.classList.add("keranjang-terbuka");
  tombolTutupKeranjang.focus();
}

// BARU: tutup panel dan kembalikan fokus ke tombol navbar.
function tutupPanelKeranjang() {
  panelKeranjang.classList.remove("buka");
  panelKeranjang.setAttribute("aria-hidden", "true");
  panelKeranjang.setAttribute("inert", "");
  tombolBukaKeranjang.setAttribute("aria-expanded", "false");
  lapisanKeranjang.hidden = true;
  document.body.classList.remove("keranjang-terbuka");
  tombolBukaKeranjang.focus();
}

// BARU: sediakan ringkasan pesanan melalui WhatsApp.
function pesanViaWhatsApp() {
  if (keranjang.length === 0) return;

  if (jenisPesananKeranjang() === "campuran") {
    tampilkanPeringatanPesanan();
    return;
  }

  for (const item of keranjang) {
    if (item.jenisPesanan === null) {
      bukaDialogJenis(null, item);
      return;
    }
    if (item.jenisPesanan === "dine-in" && item.nomorMeja === null) {
      bukaDialogMeja("atur-lama", null, item);
      return;
    }
    if (item.jenisPesanan === "takeaway" && !item.namaPemesan) {
      bukaDialogNama("atur-lama", null, item);
      return;
    }
  }

  const rincian = ["Pesanan Kopi Senja:"];
  const daftarKelompok = [];
  for (const item of keranjang) {
    let kelompok = null;
    for (const calon of daftarKelompok) {
      if (
        calon.jenisPesanan === item.jenisPesanan &&
        calon.nomorMeja === item.nomorMeja &&
        calon.namaPemesan === item.namaPemesan
      ) {
        kelompok = calon;
        break;
      }
    }
    if (!kelompok) {
      kelompok = {
        jenisPesanan: item.jenisPesanan,
        nomorMeja: item.nomorMeja,
        namaPemesan: item.namaPemesan,
        item: [],
      };
      daftarKelompok.push(kelompok);
    }
    kelompok.item.push(item);
  }

  for (const kelompok of daftarKelompok) {
    const judulKelompok = kelompok.jenisPesanan === "dine-in"
      ? `Dine-in · Meja ${kelompok.nomorMeja}:`
      : `Takeaway · Atas nama ${kelompok.namaPemesan}:`;
    rincian.push("", judulKelompok);
    for (const item of kelompok.item) {
      rincian.push(
        `- ${item.nama} x${item.jumlah} - ${formatRupiah(item.harga * item.jumlah)}`,
      );
    }
  }
  const total = keranjang.reduce(jumlahkanHarga, 0);
  rincian.push(`Total: ${formatRupiah(total)}`);
  const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(rincian.join("\n"))}`;
  const tabWhatsApp = window.open(url, "_blank");
  if (!tabWhatsApp) {
    statusPesanan.textContent =
      "WhatsApp tidak terbuka. Izinkan pop-up untuk melanjutkan; keranjang belum dikosongkan.";
    return;
  }

  tabWhatsApp.opener = null;
  keranjang = [];
  simpanKeranjang();
  renderKeranjang();
  statusPesanan.textContent =
    "Draft pesanan sudah dibuka di WhatsApp. Pastikan tekan Kirim di WhatsApp.";
}

// BARU: tangani pilihan tombol kategori.
function tanganiFilterMenu(event) {
  const tombol = event.target.closest("[data-kategori]");
  if (!tombol) return;

  for (const filter of filterMenu.querySelectorAll(".filter-tombol")) {
    const aktif = filter === tombol;
    filter.classList.toggle("aktif", aktif);
    filter.setAttribute("aria-pressed", String(aktif));
  }
  renderMenu(tombol.dataset.kategori);
}

// BARU: delegasikan klik tombol tambah pada kartu menu.
function tanganiKlikMenu(event) {
  const tombol = event.target.closest("[data-tambah]");
  if (!tombol) return;

  if (keranjang.length === 0) {
    bukaDialogJenis(tombol.dataset.tambah);
    return;
  }

  const jenisAktif = jenisPesananKeranjang();
  if (jenisAktif !== "dine-in" && jenisAktif !== "takeaway") {
    tampilkanPeringatanPesanan();
    return;
  }

  const itemPertama = keranjang[0];
  tambahKeKeranjang(
    tombol.dataset.tambah,
    jenisAktif,
    jenisAktif === "dine-in" ? itemPertama.nomorMeja : null,
    jenisAktif === "takeaway" ? itemPertama.namaPemesan : null,
  );
}

// BARU: jalankan aksi tambah, kurang, atau hapus dari panel.
function tanganiKlikKeranjang(event) {
  const tombol = event.target.closest("[data-aksi]");
  if (!tombol) return;

  const { id, aksi } = tombol.dataset;
  const jenisPesanan = tombol.dataset.jenisPesanan || null;
  const nomorMeja = tombol.dataset.meja === "" ? null : Number(tombol.dataset.meja);
  const namaPemesan = tombol.dataset.namaPemesan || null;
  if (aksi === "tambah") {
    ubahJumlahKeranjang(id, jenisPesanan, nomorMeja, namaPemesan, 1);
  }
  if (aksi === "kurang") {
    ubahJumlahKeranjang(id, jenisPesanan, nomorMeja, namaPemesan, -1);
  }
  if (aksi === "hapus") {
    hapusDariKeranjang(id, jenisPesanan, nomorMeja, namaPemesan);
  }
}

// BARU: tutup panel pesanan dengan tombol Escape.
function tanganiTombolEscape(event) {
  if (event.key === "Escape" && panelKeranjang.classList.contains("buka")) {
    tutupPanelKeranjang();
  }
}

// BARU: amati elemen untuk animasi saat masuk viewport.
function pantauAnimasi(entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }
}

// BARU: siapkan animasi dengan dukungan reduced motion.
function pasangAnimasiScroll() {
  const elemen = document.querySelectorAll(".animasi-scroll");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (const target of elemen) target.classList.add("visible");
    return;
  }

  if (!("IntersectionObserver" in window)) {
    for (const target of elemen) target.classList.add("visible");
    return;
  }

  pengamatAnimasi = new IntersectionObserver(pantauAnimasi, {
    threshold: 0.12,
  });
  for (const target of elemen) pengamatAnimasi.observe(target);
}

// BARU: daftarkan kartu baru ke pengamat animasi.
function amatiElemen(elemen) {
  if (pengamatAnimasi) pengamatAnimasi.observe(elemen);
}

// BARU: tandai link navigasi sesuai section yang terlihat.
function pantauSection(entries) {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;

    for (const tautan of menu.querySelectorAll("a")) {
      const aktif = tautan.getAttribute("href") === `#${entry.target.id}`;
      tautan.classList.toggle("active", aktif);
    }
  }
}

// BARU: amati section untuk mengatur active link navbar.
function pasangActiveLink() {
  if (!("IntersectionObserver" in window)) return;

  const pengamatSection = new IntersectionObserver(pantauSection, {
    rootMargin: "-35% 0px -55% 0px",
  });
  for (const section of document.querySelectorAll("main section[id]")) {
    pengamatSection.observe(section);
  }
}

// BARU: tampilkan tombol kembali ke atas setelah halaman digulir.
function tanganiScrollTambahan() {
  tombolAtas.classList.toggle("tampil", window.scrollY > 400);
}

// BARU: delegasikan klik tombol kembali ke atas.
function kembaliKeAtas() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// BARU: pasang event, muat keranjang, dan tampilkan menu awal.
function mulaiFiturTambahan() {
  muatKeranjang();
  renderMenu();
  renderKeranjang();
  pasangAnimasiScroll();
  pasangActiveLink();
  tanganiScrollTambahan();

  filterMenu.addEventListener("click", tanganiFilterMenu);
  daftarMenu.addEventListener("click", tanganiKlikMenu);
  isiKeranjang.addEventListener("click", tanganiKlikKeranjang);
  tombolBukaKeranjang.addEventListener("click", bukaPanelKeranjang);
  tombolTutupKeranjang.addEventListener("click", tutupPanelKeranjang);
  lapisanKeranjang.addEventListener("click", tutupPanelKeranjang);
  tombolPesan.addEventListener("click", pesanViaWhatsApp);
  tombolAtas.addEventListener("click", kembaliKeAtas);
  document.addEventListener("keydown", tanganiTombolEscape);
  window.addEventListener("scroll", tanganiScrollTambahan);
  formMeja.addEventListener("submit", simpanNomorMeja);
  document.querySelector("#batal-meja").addEventListener("click", batalDialogMeja);
  dialogMeja.addEventListener("cancel", tanganiEscapeDialogMeja);
  formNama.addEventListener("submit", simpanNamaPemesan);
  document.querySelector("#batal-nama").addEventListener("click", batalDialogNama);
  dialogNama.addEventListener("cancel", tanganiEscapeDialogNama);
  tombolDineIn.addEventListener("click", pilihDineIn);
  tombolTakeaway.addEventListener("click", pilihTakeaway);
  dialogJenis.addEventListener("cancel", tanganiEscapeDialogJenis);
}

mulaiFiturTambahan();
