# Bahas/Gadget — Agent API Guide

Panduan ini ditujukan untuk AI agent yang bertugas mengisi konten di website **Bahas/Gadget**.

---

## Autentikasi

Semua endpoint di bawah `/api/content/*` wajib menyertakan header:

```
x-api-key: <API_KEY>
```

API key disimpan di database dan bisa dinonaktifkan kapan saja. Jika key tidak valid atau tidak aktif, server mengembalikan `401`.

---

## Base URL

- **Development:** `http://localhost:3000` (jalankan `npm run dev`, port bisa berbeda jika 3000 sudah terpakai)
- **Production:** sesuaikan dengan domain deploy (Vercel, dsb.)

---

## Artikel

### Buat artikel baru

```
POST /api/content/articles
x-api-key: <API_KEY>
Content-Type: application/json
```

**Body:**

| Field        | Tipe       | Wajib | Keterangan                                                      |
|--------------|------------|-------|-----------------------------------------------------------------|
| `title`      | string     | Ya    | Judul artikel                                                   |
| `content`    | string     | Ya    | Isi artikel. Mendukung Markdown                                 |
| `slug`       | string     | Tidak | URL-friendly ID. Jika kosong, di-generate otomatis dari title  |
| `excerpt`    | string     | Tidak | Ringkasan singkat untuk kartu/preview                          |
| `category`   | string     | Tidak | Contoh: `"smartphone"`, `"laptop"`, `"audio"`                  |
| `tags`       | string[]   | Tidak | Contoh: `["samsung", "review", "flagship"]`                    |
| `coverImage` | string     | Tidak | URL gambar sampul utama (ditampilkan di hero dan kartu)        |
| `published`  | boolean    | Tidak | Default `false`. Set `true` agar artikel tampil di website     |
| `publishedAt`| string     | Tidak | ISO 8601. Jika `published: true` dan kosong, diisi `now()`     |

**Contoh request:**

```json
{
  "title": "Review Samsung Galaxy S25 Ultra: Raja Kamera",
  "content": "## Desain\n\nSamsung kembali...",
  "excerpt": "Flagship terbaik Samsung tahun ini.",
  "category": "smartphone",
  "tags": ["samsung", "android", "flagship", "review"],
  "coverImage": "https://images.unsplash.com/photo-1523474438810-b04a2480633c?w=1200&q=80",
  "published": true
}
```

**Response sukses (`201`):** objek artikel lengkap termasuk `id`.

---

### Ambil daftar artikel

```
GET /api/content/articles?published=true&category=smartphone&page=1&limit=20
x-api-key: <API_KEY>
```

| Param       | Keterangan                                    |
|-------------|-----------------------------------------------|
| `published` | `true` atau `false`                           |
| `category`  | Filter berdasarkan kategori                   |
| `page`      | Nomor halaman (default: 1)                    |
| `limit`     | Jumlah per halaman (default: 20, max: 100)    |

---

### Update artikel

```
PUT /api/content/articles/<id>
x-api-key: <API_KEY>
Content-Type: application/json
```

Kirim hanya field yang ingin diubah. Contoh update coverImage:

```json
{
  "coverImage": "https://images.unsplash.com/photo-xxxx?w=1200&q=80"
}
```

---

### Hapus artikel

```
DELETE /api/content/articles/<id>
x-api-key: <API_KEY>
```

---

### Gambar artikel (galeri)

Selain `coverImage`, setiap artikel bisa punya banyak gambar tambahan di tabel `Image`.

**Tambah gambar:**

```
POST /api/content/articles/<id>/images
x-api-key: <API_KEY>
Content-Type: application/json
```

| Field   | Tipe    | Wajib | Keterangan                                         |
|---------|---------|-------|----------------------------------------------------|
| `url`   | string  | Ya    | URL gambar                                         |
| `alt`   | string  | Tidak | Teks alternatif untuk aksesibilitas                |
| `order` | number  | Tidak | Urutan tampil (default: 0, ascending)              |

> **Catatan:** Jika artikel belum punya `coverImage`, gambar pertama yang ditambahkan otomatis dijadikan `coverImage`.

**Daftar gambar:**

```
GET /api/content/articles/<id>/images
x-api-key: <API_KEY>
```

**Hapus gambar:**

```
DELETE /api/content/articles/<id>/images/<imageId>
x-api-key: <API_KEY>
```

---

## Gadget

### Buat gadget baru

```
POST /api/content/gadgets
x-api-key: <API_KEY>
Content-Type: application/json
```

**Body:**

| Field         | Tipe    | Wajib | Keterangan                                                      |
|---------------|---------|-------|-----------------------------------------------------------------|
| `name`        | string  | Ya    | Nama model. Contoh: `"Galaxy S25 Ultra"`                       |
| `brand`       | string  | Ya    | Nama brand. Contoh: `"Samsung"`                                |
| `slug`        | string  | Tidak | Jika kosong, di-generate dari `brand-name`                     |
| `description` | string  | Tidak | Deskripsi singkat                                              |
| `category`    | string  | Tidak | Contoh: `"smartphone"`, `"laptop"`, `"tablet"`, `"audio"`      |
| `rating`      | number  | Tidak | Skala **0–10**. Contoh: `9.2`                                  |
| `specs`       | object  | Tidak | Key-value pasangan spesifikasi (lihat contoh)                  |
| `coverImage`  | string  | Tidak | URL gambar sampul utama                                        |
| `published`   | boolean | Tidak | Default `false`                                                |

**Contoh request:**

```json
{
  "name": "Galaxy S25 Ultra",
  "brand": "Samsung",
  "category": "smartphone",
  "description": "Flagship terbaik Samsung dengan S Pen built-in dan kamera 200MP.",
  "rating": 9.2,
  "coverImage": "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=800&q=80",
  "specs": {
    "Layar": "6.9 inci QHD+ AMOLED, 120Hz",
    "Chipset": "Snapdragon 8 Elite",
    "RAM": "12GB",
    "Storage": "256GB / 512GB / 1TB",
    "Kamera Utama": "200MP + 50MP UW + 10MP 3x + 50MP 5x",
    "Baterai": "5000 mAh",
    "Pengisian": "45W kabel, 15W wireless",
    "Bobot": "218 g",
    "OS": "Android 15 + One UI 7",
    "Dimensi": "162.8 × 79.0 × 8.9 mm",
    "Ketahanan": "IP68"
  },
  "published": true
}
```

**Response sukses (`201`):** objek gadget lengkap termasuk `id` dan `slug`.

---

### Ambil daftar gadget

```
GET /api/content/gadgets?brand=Samsung&category=smartphone&page=1&limit=20
x-api-key: <API_KEY>
```

| Param      | Keterangan                                  |
|------------|---------------------------------------------|
| `brand`    | Filter brand (case-insensitive)             |
| `category` | Filter kategori                             |
| `page`     | Nomor halaman (default: 1)                  |
| `limit`    | Jumlah per halaman (default: 20, max: 100)  |

---

### Update gadget

```
PUT /api/content/gadgets/<id>
x-api-key: <API_KEY>
Content-Type: application/json
```

Kirim hanya field yang ingin diubah.

---

### Hapus gadget

```
DELETE /api/content/gadgets/<id>
x-api-key: <API_KEY>
```

---

### Gambar gadget (galeri)

Setiap gadget bisa punya banyak gambar. Gambar ini ditampilkan di halaman detail gadget dalam seksi **Galeri Foto**.

**Tambah gambar:**

```
POST /api/content/gadgets/<id>/images
x-api-key: <API_KEY>
Content-Type: application/json
```

| Field   | Tipe    | Wajib | Keterangan                                         |
|---------|---------|-------|----------------------------------------------------|
| `url`   | string  | Ya    | URL gambar                                         |
| `alt`   | string  | Tidak | Teks alternatif                                    |
| `order` | number  | Tidak | Urutan tampil (default: 0, ascending)              |

> **Catatan:** Jika gadget belum punya `coverImage`, gambar pertama yang ditambahkan otomatis dijadikan `coverImage`.

**Contoh — tambah beberapa foto:**

```json
{ "url": "https://images.unsplash.com/photo-xxx?w=800&q=80", "alt": "Samsung Galaxy S25 Ultra tampak depan", "order": 0 }
{ "url": "https://images.unsplash.com/photo-yyy?w=800&q=80", "alt": "Samsung Galaxy S25 Ultra kamera belakang", "order": 1 }
{ "url": "https://images.unsplash.com/photo-zzz?w=800&q=80", "alt": "Samsung Galaxy S25 Ultra dengan S Pen", "order": 2 }
```

**Daftar gambar:**

```
GET /api/content/gadgets/<id>/images
x-api-key: <API_KEY>
```

**Hapus gambar:**

```
DELETE /api/content/gadgets/<id>/images/<imageId>
x-api-key: <API_KEY>
```

---

## Alur Kerja yang Disarankan

### Menambah gadget baru dengan gambar:

```
1. POST /api/content/gadgets           → simpan id dari response
2. POST /api/content/gadgets/<id>/images  → gambar utama (order: 0)
3. POST /api/content/gadgets/<id>/images  → gambar tambahan (order: 1, 2, dst.)
```

### Menambah artikel review baru:

```
1. POST /api/content/articles          → simpan id dari response
2. POST /api/content/articles/<id>/images → cover/gambar pendukung
```

---

## Kode Error

| Status | Artinya                                        |
|--------|------------------------------------------------|
| `401`  | API key tidak ada, tidak valid, atau nonaktif  |
| `400`  | Field wajib tidak ada atau format salah        |
| `404`  | Data tidak ditemukan                           |
| `500`  | Error server                                   |

---

## Tips untuk Agent

1. **Selalu set `"published": true`** jika konten sudah siap tayang. Default-nya `false` (draft).
2. **`rating` skala 0–10**, bukan 0–5. Nilai seperti `8.5`, `9.2`, `7.8` adalah valid.
3. **`content` artikel mendukung Markdown** — gunakan `##` untuk heading, `**bold**`, `> blockquote`, bullet list, dsb.
4. **`specs` adalah objek bebas** — key adalah nama spesifikasi, value adalah string nilainya. Tidak ada schema kaku.
5. **Slug di-generate otomatis** dari title/nama jika tidak diisi.
6. **`id` dari response POST** dibutuhkan untuk menambah gambar, PUT, dan DELETE. Simpan setelah POST.
7. **`coverImage`** bisa di-set langsung saat POST/PUT, atau otomatis terisi dari gambar pertama yang di-POST ke endpoint `/images`.
8. **Gambar di galeri** (`/images`) ditampilkan di halaman detail gadget dalam seksi "Galeri Foto". Artikel tidak menampilkan galeri di halaman detail, tapi gambar tersimpan di DB.
9. **Gunakan Unsplash** untuk gambar dummy: format URL `https://images.unsplash.com/photo-<ID>?w=800&q=80` (gadget) atau `?w=1200&q=80` (artikel hero).
