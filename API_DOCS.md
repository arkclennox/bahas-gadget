# Bahas Gadget — Content API Documentation

Base URL: `https://bahas-gadget.vercel.app` (production) | `http://localhost:3000` (dev)

---

## Authentication

Semua endpoint `/api/content/*` membutuhkan header:

```
x-api-key: bgk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Generate API key pertama via Admin API (lihat bagian Admin di bawah).

---

## Content API

### Articles

#### POST `/api/content/articles` — Buat artikel baru

**Headers:** `x-api-key`, `Content-Type: application/json`

**Body:**
```json
{
  "title": "string (wajib)",
  "content": "string markdown (wajib)",
  "slug": "string (opsional, auto-generate dari title)",
  "excerpt": "string (opsional)",
  "coverImage": "https://... (opsional)",
  "category": "smartphone|laptop|tablet|wearable|audio (opsional)",
  "tags": ["tag1", "tag2"],
  "published": true
}
```

**Response 201:**
```json
{
  "id": "cuid",
  "title": "...",
  "slug": "...",
  ...
}
```

---

#### GET `/api/content/articles` — List semua artikel

**Query params:** `?published=true&category=smartphone&limit=10&page=1`

**Response 200:**
```json
{
  "articles": [...],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

---

#### PUT `/api/content/articles/:id` — Update artikel

**Body:** field apapun yang ingin diupdate (partial update)

---

#### DELETE `/api/content/articles/:id` — Hapus artikel

**Response 200:** `{ "success": true }`

---

### Gadgets

#### POST `/api/content/gadgets` — Tambah gadget baru

**Body:**
```json
{
  "name": "Galaxy S25 Ultra (wajib)",
  "brand": "Samsung (wajib)",
  "slug": "opsional",
  "description": "string",
  "specs": {
    "Layar": "6.9 inci QHD+ AMOLED",
    "Chipset": "Snapdragon 8 Elite",
    "RAM": "12GB",
    "Storage": "256GB"
  },
  "price": 21999000,
  "rating": 4.7,
  "coverImage": "https://...",
  "category": "smartphone",
  "published": true
}
```

#### GET `/api/content/gadgets` — List semua gadget

**Query params:** `?brand=samsung&category=smartphone&limit=10&page=1`

#### PUT `/api/content/gadgets/:id` — Update gadget
#### DELETE `/api/content/gadgets/:id` — Hapus gadget

---

## Public API (Tanpa Autentikasi)

### GET `/api/articles` — Semua artikel published
**Query:** `?category=&tag=&limit=&page=`

### GET `/api/articles/:slug` — Satu artikel by slug

### GET `/api/gadgets` — Semua gadget published
**Query:** `?brand=&category=&limit=&page=`

### GET `/api/gadgets/:slug` — Satu gadget by slug

---

## Admin API

Lindungi dengan header `x-admin-secret`.

### POST `/api/admin/apikeys` — Generate API key baru

```bash
curl -X POST http://localhost:3000/api/admin/apikeys \
  -H "x-admin-secret: ADMIN_SECRET_MU" \
  -H "Content-Type: application/json" \
  -d '{"label": "AI Agent v1"}'
```

**Response:**
```json
{
  "id": "...",
  "key": "bgk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "label": "AI Agent v1",
  "isActive": true,
  "createdAt": "..."
}
```

⚠️ **Key hanya ditampilkan sekali.** Simpan segera.

### GET `/api/admin/apikeys` — List semua API keys (key di-mask)
### DELETE `/api/admin/apikeys/:id` — Nonaktifkan API key (soft delete)

---

## Contoh Lengkap

### Buat Artikel Baru

```bash
curl -X POST http://localhost:3000/api/content/articles \
  -H "x-api-key: bgk_xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review Samsung Galaxy S25 Ultra",
    "content": "## Desain\nSamsung kembali hadir dengan desain premium...\n\n## Kamera\nSistem kamera 200MP memberikan hasil luar biasa.",
    "excerpt": "Samsung Galaxy S25 Ultra hadir dengan chipset Snapdragon 8 Elite terbaru.",
    "category": "smartphone",
    "tags": ["samsung", "android", "flagship"],
    "published": true
  }'
```

### Tambah Gadget

```bash
curl -X POST http://localhost:3000/api/content/gadgets \
  -H "x-api-key: bgk_xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Galaxy S25 Ultra",
    "brand": "Samsung",
    "category": "smartphone",
    "price": 21999000,
    "rating": 9.2,
    "description": "Flagship terbaik Samsung dengan S Pen built-in.",
    "specs": {
      "Layar": "6.9 inci QHD+ AMOLED, 120Hz",
      "Chipset": "Snapdragon 8 Elite",
      "RAM": "12GB",
      "Storage": "256GB / 512GB / 1TB",
      "Kamera Utama": "200MP",
      "Baterai": "5000 mAh",
      "Pengisian": "45W kabel, 15W wireless",
      "OS": "Android 15 + One UI 7"
    },
    "published": true
  }'
```
