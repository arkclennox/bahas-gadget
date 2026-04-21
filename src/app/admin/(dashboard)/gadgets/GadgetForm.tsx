'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type CTALink = { label: string; url: string }
type SpecRow = { key: string; value: string }
type SpecGroup = { group: string; rows: SpecRow[] }

const DEFAULT_CTA: CTALink[] = [
  { label: 'Shopee', url: '' },
  { label: 'Tiktok', url: '' },
  { label: 'Blibli', url: '' },
]

const SMARTPHONE_TEMPLATE: SpecGroup[] = [
  { group: 'Jaringan', rows: [
    { key: 'Teknologi', value: '' },
    { key: 'Band 2G', value: '' },
    { key: 'Band 3G', value: '' },
    { key: 'Band 4G LTE', value: '' },
    { key: 'Band 5G', value: '' },
  ]},
  { group: 'Identitas', rows: [
    { key: 'Tahun Rilis', value: '' },
    { key: 'Status', value: '' },
    { key: 'Dimensi', value: '' },
    { key: 'Berat', value: '' },
    { key: 'Bahan', value: '' },
    { key: 'SIM', value: '' },
  ]},
  { group: 'Layar', rows: [
    { key: 'Tipe', value: '' },
    { key: 'Ukuran', value: '' },
    { key: 'Resolusi', value: '' },
    { key: 'Refresh Rate', value: '' },
    { key: 'Kecerahan', value: '' },
    { key: 'Pelindung Layar', value: '' },
  ]},
  { group: 'Platform', rows: [
    { key: 'OS', value: '' },
    { key: 'Chipset', value: '' },
    { key: 'CPU', value: '' },
    { key: 'GPU', value: '' },
  ]},
  { group: 'Memori', rows: [
    { key: 'Slot Kartu', value: '' },
    { key: 'RAM', value: '' },
    { key: 'Penyimpanan Internal', value: '' },
  ]},
  { group: 'Kamera Utama', rows: [
    { key: 'Konfigurasi', value: '' },
    { key: 'Fitur', value: '' },
    { key: 'Video', value: '' },
  ]},
  { group: 'Kamera Depan', rows: [
    { key: 'Resolusi', value: '' },
    { key: 'Fitur', value: '' },
    { key: 'Video', value: '' },
  ]},
  { group: 'Suara', rows: [
    { key: 'Speaker', value: '' },
    { key: 'Jack 3.5mm', value: '' },
  ]},
  { group: 'Konektivitas', rows: [
    { key: 'WLAN', value: '' },
    { key: 'Bluetooth', value: '' },
    { key: 'GPS', value: '' },
    { key: 'NFC', value: '' },
    { key: 'USB', value: '' },
    { key: 'Inframerah', value: '' },
  ]},
  { group: 'Sensor', rows: [
    { key: 'Sensor', value: '' },
  ]},
  { group: 'Baterai', rows: [
    { key: 'Tipe', value: '' },
    { key: 'Kapasitas', value: '' },
    { key: 'Pengisian Kabel', value: '' },
    { key: 'Pengisian Nirkabel', value: '' },
  ]},
  { group: 'Lainnya', rows: [
    { key: 'Warna', value: '' },
    { key: 'Model', value: '' },
    { key: 'SAR', value: '' },
  ]},
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

function specsToGroups(specs: unknown): SpecGroup[] {
  if (!specs || typeof specs !== 'object' || Array.isArray(specs)) return []
  const obj = specs as Record<string, unknown>
  const firstVal = Object.values(obj)[0]
  if (firstVal && typeof firstVal === 'object' && !Array.isArray(firstVal)) {
    // grouped format
    return Object.entries(obj as Record<string, Record<string, string>>).map(([group, rows]) => ({
      group,
      rows: Object.entries(rows).map(([key, value]) => ({ key, value })),
    }))
  }
  // flat format — wrap in single group
  return [{ group: 'Spesifikasi', rows: Object.entries(obj as Record<string, string>).map(([key, value]) => ({ key, value })) }]
}

function groupsToSpecs(groups: SpecGroup[]): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {}
  for (const g of groups) {
    if (!g.group.trim()) continue
    const rows: Record<string, string> = {}
    for (const row of g.rows) {
      if (row.key.trim()) rows[row.key.trim()] = row.value
    }
    if (Object.keys(rows).length > 0) result[g.group.trim()] = rows
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
  const [specGroups, setSpecGroups] = useState<SpecGroup[]>(specsToGroups(initialData?.specs))

  const rawCTA = initialData?.ctaLinks
  const [ctaLinks, setCtaLinks] = useState<CTALink[]>(
    Array.isArray(rawCTA) && rawCTA.length > 0 ? (rawCTA as CTALink[]) : DEFAULT_CTA
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateCTA = (index: number, field: 'label' | 'url', value: string) => {
    setCtaLinks(links => links.map((l, i) => i === index ? { ...l, [field]: value } : l))
  }

  const updateGroupName = (gi: number, value: string) => {
    setSpecGroups(gs => gs.map((g, i) => i === gi ? { ...g, group: value } : g))
  }

  const updateSpecRow = (gi: number, ri: number, field: 'key' | 'value', value: string) => {
    setSpecGroups(gs => gs.map((g, i) => i === gi
      ? { ...g, rows: g.rows.map((r, j) => j === ri ? { ...r, [field]: value } : r) }
      : g
    ))
  }

  const addRowToGroup = (gi: number) => {
    setSpecGroups(gs => gs.map((g, i) => i === gi ? { ...g, rows: [...g.rows, { key: '', value: '' }] } : g))
  }

  const removeRow = (gi: number, ri: number) => {
    setSpecGroups(gs => gs.map((g, i) => i === gi ? { ...g, rows: g.rows.filter((_, j) => j !== ri) } : g))
  }

  const addGroup = () => {
    setSpecGroups(gs => [...gs, { group: '', rows: [{ key: '', value: '' }] }])
  }

  const removeGroup = (gi: number) => {
    setSpecGroups(gs => gs.filter((_, i) => i !== gi))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const specsPayload = specGroups.length > 0 ? groupsToSpecs(specGroups) : null

    const payload = {
      name, brand,
      slug: slug || undefined,
      description: description || null,
      category: category || null,
      rating: rating ? parseFloat(rating) : null,
      coverImage: coverImage || null,
      published,
      specs: specsPayload && Object.keys(specsPayload).length > 0 ? specsPayload : null,
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
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => setSpecGroups(SMARTPHONE_TEMPLATE.map(g => ({ ...g, rows: g.rows.map(r => ({ ...r })) })))}
              className="btn btn-accent"
              style={{ fontSize: 11, padding: '5px 10px' }}
            >
              Template Smartphone
            </button>
            <button type="button" onClick={addGroup} className="btn" style={{ fontSize: 11, padding: '5px 10px' }}>
              + Grup Baru
            </button>
          </div>
        </div>

        {specGroups.length === 0 && (
          <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-mute)', textAlign: 'center', border: '1px dashed var(--rule)' }}>
            Klik "Template Smartphone" untuk mengisi otomatis, atau "+ Grup Baru" untuk mulai manual.
          </div>
        )}

        {specGroups.map((group, gi) => (
          <div key={gi} style={{ border: '1px solid var(--rule)', marginBottom: 16, background: 'var(--paper-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid var(--rule)', background: 'var(--paper-3)' }}>
              <input
                type="text"
                value={group.group}
                onChange={e => updateGroupName(gi, e.target.value)}
                placeholder="Nama Grup (mis. Layar)"
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--accent)', background: 'transparent', border: 'none', padding: 0, flex: 1 }}
              />
              <button
                type="button"
                onClick={() => removeGroup(gi)}
                style={{ background: 'none', border: 'none', color: 'var(--bad)', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
                title="Hapus grup"
              >×</button>
            </div>
            <div style={{ padding: '12px' }}>
              {group.rows.map((row, ri) => (
                <div key={ri} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 28px', gap: 6, marginBottom: 6 }}>
                  <input
                    type="text" value={row.key} placeholder="Nama spesifikasi"
                    onChange={e => updateSpecRow(gi, ri, 'key', e.target.value)}
                    style={{ ...inputStyle, fontSize: 13 }}
                  />
                  <input
                    type="text" value={row.value} placeholder="Nilai"
                    onChange={e => updateSpecRow(gi, ri, 'value', e.target.value)}
                    style={{ ...inputStyle, fontSize: 13 }}
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(gi, ri)}
                    style={{ background: 'var(--paper-2)', border: '1px solid var(--rule)', color: 'var(--bad)', cursor: 'pointer', fontSize: 14 }}
                    title="Hapus baris"
                  >×</button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRowToGroup(gi)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-mute)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', marginTop: 2 }}
              >
                + tambah baris
              </button>
            </div>
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
