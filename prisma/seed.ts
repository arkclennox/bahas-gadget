import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

config({ path: '.env.local', override: false })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Gadgets
  const gadget1 = await prisma.gadget.upsert({
    where: { slug: 'samsung-galaxy-s25-ultra' },
    update: {},
    create: {
      name: 'Galaxy S25 Ultra',
      brand: 'Samsung',
      slug: 'samsung-galaxy-s25-ultra',
      category: 'smartphone',
      description: 'Flagship terbaik Samsung dengan S Pen built-in dan kamera 200MP yang luar biasa.',
      price: 21999000,
      rating: 9.2,
      specs: {
        Layar: '6.9 inci QHD+ AMOLED, 120Hz, 2600 nits',
        Chipset: 'Snapdragon 8 Elite',
        RAM: '12GB',
        Storage: '256GB / 512GB / 1TB',
        'Kamera Utama': '200MP + 50MP UW + 10MP 3x + 50MP 5x',
        Baterai: '5000 mAh',
        Pengisian: '45W kabel, 15W wireless',
        Bobot: '218 g',
        OS: 'Android 15 + One UI 7',
        Dimensi: '162.8 × 79.0 × 8.9 mm',
        Ketahanan: 'IP68',
      },
      published: true,
    },
  })

  const gadget2 = await prisma.gadget.upsert({
    where: { slug: 'apple-iphone-16-pro-max' },
    update: {},
    create: {
      name: 'iPhone 16 Pro Max',
      brand: 'Apple',
      slug: 'apple-iphone-16-pro-max',
      category: 'smartphone',
      description: 'iPhone terbesar dengan chip A18 Pro dan sistem kamera ProRes terdepan.',
      price: 24999000,
      rating: 9.4,
      specs: {
        Layar: '6.9 inci Super Retina XDR OLED, 120Hz ProMotion',
        Chipset: 'Apple A18 Pro',
        RAM: '8GB',
        Storage: '256GB / 512GB / 1TB',
        'Kamera Utama': '48MP Fusion + 48MP UW + 12MP 5x tele',
        Baterai: '4685 mAh',
        Pengisian: '27W kabel, MagSafe 25W',
        Bobot: '227 g',
        OS: 'iOS 18',
        Dimensi: '163.0 × 77.6 × 8.25 mm',
        Ketahanan: 'IP68',
      },
      published: true,
    },
  })

  const gadget3 = await prisma.gadget.upsert({
    where: { slug: 'xiaomi-15-pro' },
    update: {},
    create: {
      name: '15 Pro',
      brand: 'Xiaomi',
      slug: 'xiaomi-15-pro',
      category: 'smartphone',
      description: 'Flagship Xiaomi dengan kamera Leica dan pengisian super cepat 90W.',
      price: 14999000,
      rating: 8.8,
      specs: {
        Layar: '6.73 inci LTPO AMOLED, 120Hz, 3200 nits',
        Chipset: 'Snapdragon 8 Elite',
        RAM: '12GB / 16GB',
        Storage: '256GB / 512GB',
        'Kamera Utama': '50MP Leica Summilux + 50MP UW + 50MP 5x tele',
        Baterai: '6000 mAh',
        Pengisian: '90W kabel, 50W wireless',
        Bobot: '213 g',
        OS: 'Android 15 + HyperOS 2',
        Dimensi: '160.4 × 75.3 × 8.25 mm',
        Ketahanan: 'IP68',
      },
      published: true,
    },
  })

  console.log('Gadgets created:', gadget1.name, gadget2.name, gadget3.name)

  // Articles
  const article1 = await prisma.article.upsert({
    where: { slug: 'review-samsung-galaxy-s25-ultra' },
    update: {},
    create: {
      title: 'Review Samsung Galaxy S25 Ultra: Raja Kamera Masih Bertakhta',
      slug: 'review-samsung-galaxy-s25-ultra',
      category: 'smartphone',
      tags: ['samsung', 'android', 'flagship', 'review'],
      excerpt: 'Samsung Galaxy S25 Ultra hadir dengan penyempurnaan signifikan — kamera lebih tajam, AI lebih pintar, dan desain yang semakin elegan.',
      content: `## Desain dan Build Quality

Samsung Galaxy S25 Ultra melanjutkan tradisi desain premium yang telah menjadi ciri khas seri Ultra. Bingkai titanium berlapiskan lapisan anti-goresan baru memberikan daya tahan yang lebih baik dibanding generasi sebelumnya.

S Pen yang tersimpan di sudut kanan bawah tetap menjadi pembeda utama. Latensi 2.8ms membuatnya terasa seperti menulis di atas kertas sungguhan.

## Layar

Panel QHD+ AMOLED 6.9 inci dengan kecerahan puncak 2600 nits tampil mengesankan bahkan di bawah terik matahari langsung. Refresh rate adaptif 1-120Hz bekerja cerdas untuk menghemat baterai tanpa mengorbankan kelancaran.

## Kamera

Sistem kamera quad-sensor adalah keunggulan utama S25 Ultra. Sensor utama 200MP menghasilkan foto dengan detail luar biasa bahkan dalam kondisi cahaya rendah. Zoom periskop 5x dan zoom digital 10x memberikan fleksibilitas yang sulit ditandingi.

> Samsung telah menciptakan smartphone yang paling serbaguna untuk fotografi mobile yang pernah ada.

## Performa

Chipset Snapdragon 8 Elite yang dipadukan dengan RAM 12GB memberikan performa yang konsisten. Benchmark AnTuTu menembus angka 2.5 juta — tertinggi yang pernah kami uji.

## Baterai

Baterai 5000 mAh dengan pengisian 45W mengisi penuh dalam waktu sekitar 65 menit. Pengisian wireless 15W tersedia sebagai alternatif kabel.

## Kesimpulan

Samsung Galaxy S25 Ultra adalah smartphone paling komprehensif yang tersedia saat ini. Harga yang tinggi sebanding dengan kemampuannya yang melampaui kompetitor di hampir semua aspek.`,
      published: true,
      publishedAt: new Date('2025-01-25'),
    },
  })

  const article2 = await prisma.article.upsert({
    where: { slug: 'review-iphone-16-pro-max' },
    update: {},
    create: {
      title: 'Review iPhone 16 Pro Max: Kesempurnaan yang Konsisten',
      slug: 'review-iphone-16-pro-max',
      category: 'smartphone',
      tags: ['apple', 'ios', 'flagship', 'review'],
      excerpt: 'Apple menyempurnakan formula yang sudah hebat: chip A18 Pro yang brutal, kamera yang makin serbaguna, dan layar terbesar dalam sejarah iPhone.',
      content: `## Desain

iPhone 16 Pro Max mempertahankan identitas desain yang sudah dikenal: bingkai titanium, kaca belakang matte, dan Dynamic Island yang kini semakin fungsional.

Dibandingkan iPhone 15 Pro Max, dimensinya sedikit lebih tipis — sebuah pencapaian teknik mengingat kapasitas baterai yang lebih besar.

## Camera Control

Tombol Camera Control baru pada sisi kanan bodi adalah tambahan yang mengubah cara kita memotret. Gesture geser untuk mengatur exposure, zoom, atau memilih filter terasa intuitif setelah beberapa hari pembiasaan.

## Kamera

Sistem triple-camera dengan sensor 48MP Fusion baru, ultrawide 48MP, dan telephoto 12MP 5x terus menjadi benchmark industri untuk konsistensi warna dan detail.

Video ProRes 4K 120fps adalah fitur yang akan membuat videografer profesional sangat senang.

## Chip A18 Pro

A18 Pro bukan sekadar peningkatan angka. Kemampuan Neural Engine yang 2x lebih cepat membuat fitur AI seperti Writing Tools dan Photo Clean Up bekerja instan.

## Kesimpulan

Jika Anda menginginkan smartphone terbaik yang pernah ada di ekosistem iOS, iPhone 16 Pro Max adalah jawabannya — tanpa kompromi.`,
      published: true,
      publishedAt: new Date('2024-09-25'),
    },
  })

  const article3 = await prisma.article.upsert({
    where: { slug: 'panduan-beli-smartphone-2025' },
    update: {},
    create: {
      title: 'Panduan Membeli Smartphone 2025: Yang Perlu Anda Tahu',
      slug: 'panduan-beli-smartphone-2025',
      category: 'smartphone',
      tags: ['panduan', 'tips', 'rekomendasi'],
      excerpt: 'Dari flagship Rp 25 juta hingga mid-range Rp 3 juta — kami membantu Anda menemukan smartphone yang tepat sesuai kebutuhan dan anggaran.',
      content: `## Tentukan Anggaran Dulu

Pasar smartphone Indonesia terbagi menjadi beberapa segmen yang jelas:

- Di bawah Rp 3 juta: Entry-level yang kini sudah sangat layak pakai
- Rp 3-6 juta: Mid-range terbaik untuk kebanyakan orang
- Rp 6-15 juta: Flagship killer dan mid-range premium
- Di atas Rp 15 juta: Flagship sejati

## Apa yang Benar-Benar Penting

Kebanyakan orang tidak membutuhkan kamera 200MP atau RAM 16GB. Yang lebih penting:

1. Dukungan update OS — minimal 3 tahun, idealnya 5-7 tahun
2. Baterai — 4500mAh ke atas untuk pemakaian sehari penuh
3. Layar OLED — perbedaannya terlihat jelas dibanding LCD
4. Build quality — frame plastik tidak selalu buruk, tapi terasa bedanya

## Rekomendasi per Segmen

Untuk penggunaan harian dengan anggaran terbatas, Xiaomi Redmi Note 13 Pro+ menawarkan nilai terbaik. Untuk flagship, Samsung Galaxy S25 adalah pilihan paling seimbang.

> Smartphone terbaik adalah yang paling cocok dengan kebutuhan Anda — bukan yang paling mahal.`,
      published: true,
      publishedAt: new Date('2025-03-01'),
    },
  })

  console.log('Articles created:', article1.title, article2.title, article3.title)
  console.log('Seeding complete!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
