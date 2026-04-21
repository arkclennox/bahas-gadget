'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type CTALink = { label: string; url: string }
type SpecRow = { key: string; value: string }

const DEFAULT_CTA: CTALink[] = [
  { label: 'Shopee', url: '' },
  { label: 'Tiktok', url: '' },
  { label: 'Blibli', url: '' },
]

type InitialData = {
  id?: string
  name?: string
  brand?: string
  slug?: string
  description?: string | null
  category?: string | null
  rating?: number | null
  coverImage?: string | null
  published?: boolean
  specs?: unknown
  ctaLinks?: unknown
}

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%',
  background: 'var(--paper-2)', border: '1px solid var(--rule)',
  color: 'var(--ink)', padding: '8px 12px',
  fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.1em',
  color: 'var(--ink-dim)', marginBottom: 6,
}

const fieldStyle: React.CSSProperties = { marginBottom: 20 }

function specsToRows(specs: unknown): SpecRow[] {
  if (!specs || typeof specs !== 'object' || Array.isArray(specs)) return []
  return Object.entries(specs as Record<string, string>).map(([key, value]) => ({ key, value }))
}

function rowsToSpecs(rows: SpecRow[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (const row of rows) {
    if (row.key.trim()) result[row.key.trim()] = row.value
  }
  return result
}

export default function GadgetForm({ initialData }: { initialData?: InitialData }) {
  const router = useRouter()
  const isEdit = !!initialData?.id

  const [name, setName] = useState(initialData?.name ?? '')
  const [brand, setBrand] = useState(initialData?.brand ?? '')
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [category, setCategory] = useState(initialData?.category ?? '')
  const [rating, setRating] = useState(initialData?.rating?.toString() ?? '')
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? '')
  const [published, setPublished] = useState(initialData?.published ?? false)
  const [specs, setSpecs] = useState<SpecRow[]>(specsToRows(initialData?.specs))

  const rawCTA = initialData?.ctaLinks
  const [ctaLinks, setCtaLinks] = useState<CTALink[]>(
    Array.isArray(rawCTA) && rawCTA.length > 0 ? (rawCTA as CTALink[]) : DEFAULT_CTA
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateCTA = (index: number, field: 'label' | 'url', value: string) => {
    setCtaLinks(links => links.map((l, i) => i === index ? { ...l, [field]: value } : l))
  }

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    setSpecs(rows => rows.map((r, i) => i === index ? { ...r, [field]: value } : r))
  }

  const addSpec = () => setSpecs(rows => [...rows, { key: '', value: '' }])

  const removeSpec = (index: number) => setSpecs(rows => rows.filter((_, i) => i !== index))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      name, brand,
      slug: slug || undefined,
      description: description || null,
      category: category || null,
      rating: rating ? parseFloat(rating) : null,
      coverImage: coverImage || null,
      published,
      specs: specs.length > 0 ? rowsToSpecs(specs) : null,
      ctaLinks,
    }

    try {
      const url = isEdit ? `/api/admin/gadgets/${initialData!.id}` : '/api/admin/gadgets'
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error ?? 'Terjadi kesalahan.')
        setLoading(false)
        return
      }

      router.push('/admin/gadgets')
      router.refresh()
    } catch {
      setError('Network error.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 860 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Nama Model *</label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            required style={inputStyle} placeholder="Galaxy S25 Ultra"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Brand *</label>
          <input
            type="text" value={brand} onChange={e => setBrand(e.target.value)}
            required style={inputStyle} placeholder="Samsung"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Slug</label>
          <input
            type="text" value={slug} onChange={e => setSlug(e.target.value)}
            style={inputStyle} placeholder="otomatis dari brand-nama"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Kategori</label>
          <input
            type="text" value={category} onChange={e => setCategory(e.target.value)}
            style={inputStyle} placeholder="smartphone, laptop, tablet, audio..."
          />
        </div>

        <div style={{ ...fieldStyle, gridColumn: 'span 2' }}>
          <label style={labelStyle}>Deskripsi</label>
          <textarea
            value={description} onChange={e => setDescription(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
            placeholder="Deskripsi singkat gadget"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Rating <span style={{ color: 'var(--ink-mute)' }}>(0–10)</span></label>
          <input
            type="number" value={rating} onChange={e => setRating(e.target.value)}
            min="0" max="10" step="0.1"
            style={inputStyle} placeholder="9.2"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Cover Image URL</label>
          <input
            type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)}
            style={inputStyle} placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>

      {/* Specs Editor */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Spesifikasi</label>
          <button type="button" onClick={addSpec} className="btn" style={{ fontSize: 11, padding: '5px 10px' }}>
            + Tambah Baris
          </button>
        </div>
        {specs.length === 0 && (
          <div style={{ padding: '16px 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-mute)', textAlign: 'center', border: '1px dashed var(--rule)' }}>
            Belum ada spesifikasi. Klik "+ Tambah Baris" untuk menambah.
          </div>
        )}
        {specs.map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 32px', gap: 8, marginBottom: 8 }}>
            <input
              type="text" value={row.key} placeholder="Layar"
              onChange={e => updateSpec(i, 'key', e.target.value)}
              style={{ ...inputStyle, fontSize: 13 }}
            />
            <input
              type="text" value={row.value} placeholder="6.9 inci QHD+ AMOLED, 120Hz"
              onChange={e => updateSpec(i, 'value', e.target.value)}
              style={{ ...inputStyle, fontSize: 13 }}
            />
            <button
              type="button"
              onClick={() => removeSpec(i)}
              style={{ background: 'var(--paper-2)', border: '1px solid var(--rule)', color: 'var(--bad)', cursor: 'pointer', fontSize: 14 }}
              title="Hapus baris"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* CTA Links */}
      <div style={{ marginBottom: 24, padding: 20, border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-dim)', marginBottom: 16 }}>
          Tombol Affiliate (CTA)
        </div>
        {ctaLinks.map((link, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 12, marginBottom: 10 }}>
            <div>
              <label style={{ ...labelStyle, fontSize: 10 }}>Label</label>
              <input
                type="text" value={link.label}
                onChange={e => updateCTA(i, 'label', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 10 }}>URL Affiliate</label>
              <input
                type="text" value={link.url} placeholder="https://shopee.co.id/..."
                onChange={e => updateCTA(i, 'url', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Published toggle */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="checkbox" id="published" checked={published}
          onChange={e => setPublished(e.target.checked)}
          style={{ width: 16, height: 16, accentColor: 'var(--accent)', cursor: 'pointer' }}
        />
        <label htmlFor="published" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
          Tayang (Published)
        </label>
      </div>

      {error && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--bad)', marginBottom: 16 }}>{error}</div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" disabled={loading} className="btn btn-accent">
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Buat Gadget'}
        </button>
        <Link href="/admin/gadgets" className="btn">Batal</Link>
      </div>
    </form>
  )
}
