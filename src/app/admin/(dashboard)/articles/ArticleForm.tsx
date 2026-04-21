'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type CTALink = { label: string; url: string }

const DEFAULT_CTA: CTALink[] = [
  { label: 'Shopee', url: '' },
  { label: 'Tiktok', url: '' },
  { label: 'Blibli', url: '' },
]

type InitialData = {
  id?: string
  title?: string
  slug?: string
  excerpt?: string | null
  category?: string | null
  tags?: string[]
  content?: string
  coverImage?: string | null
  published?: boolean
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

export default function ArticleForm({ initialData }: { initialData?: InitialData }) {
  const router = useRouter()
  const isEdit = !!initialData?.id

  const [title, setTitle] = useState(initialData?.title ?? '')
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? '')
  const [category, setCategory] = useState(initialData?.category ?? '')
  const [tags, setTags] = useState((initialData?.tags ?? []).join(', '))
  const [content, setContent] = useState(initialData?.content ?? '')
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? '')
  const [published, setPublished] = useState(initialData?.published ?? false)

  const rawCTA = initialData?.ctaLinks
  const [ctaLinks, setCtaLinks] = useState<CTALink[]>(
    Array.isArray(rawCTA) && rawCTA.length > 0 ? (rawCTA as CTALink[]) : DEFAULT_CTA
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateCTA = (index: number, field: 'label' | 'url', value: string) => {
    setCtaLinks(links => links.map((l, i) => i === index ? { ...l, [field]: value } : l))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean)

    const payload = {
      title,
      slug: slug || undefined,
      excerpt: excerpt || null,
      category: category || null,
      tags: tagsArray,
      content,
      coverImage: coverImage || null,
      published,
      ctaLinks,
    }

    try {
      const url = isEdit ? `/api/admin/articles/${initialData!.id}` : '/api/admin/articles'
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

      router.push('/admin/articles')
      router.refresh()
    } catch {
      setError('Network error.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 860 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ ...fieldStyle, gridColumn: 'span 2' }}>
          <label style={labelStyle}>Judul *</label>
          <input
            type="text" value={title} onChange={e => setTitle(e.target.value)}
            required style={inputStyle} placeholder="Judul artikel"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Slug</label>
          <input
            type="text" value={slug} onChange={e => setSlug(e.target.value)}
            style={inputStyle} placeholder="otomatis dari judul"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Kategori</label>
          <input
            type="text" value={category} onChange={e => setCategory(e.target.value)}
            style={inputStyle} placeholder="smartphone, laptop, audio..."
          />
        </div>

        <div style={{ ...fieldStyle, gridColumn: 'span 2' }}>
          <label style={labelStyle}>Excerpt</label>
          <input
            type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)}
            style={inputStyle} placeholder="Ringkasan singkat untuk preview"
          />
        </div>

        <div style={{ ...fieldStyle, gridColumn: 'span 2' }}>
          <label style={labelStyle}>Tags <span style={{ color: 'var(--ink-mute)' }}>(pisah dengan koma)</span></label>
          <input
            type="text" value={tags} onChange={e => setTags(e.target.value)}
            style={inputStyle} placeholder="samsung, review, flagship"
          />
        </div>

        <div style={{ ...fieldStyle, gridColumn: 'span 2' }}>
          <label style={labelStyle}>Cover Image URL</label>
          <input
            type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)}
            style={inputStyle} placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div style={{ ...fieldStyle, gridColumn: 'span 2' }}>
          <label style={labelStyle}>Konten <span style={{ color: 'var(--ink-mute)' }}>(Markdown)</span></label>
          <textarea
            value={content} onChange={e => setContent(e.target.value)}
            required rows={20}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontFamily: 'var(--font-mono)', fontSize: 13 }}
            placeholder="## Heading&#10;&#10;Paragraf pertama..."
          />
        </div>
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
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Buat Artikel'}
        </button>
        <Link href="/admin/articles" className="btn">Batal</Link>
      </div>
    </form>
  )
}
