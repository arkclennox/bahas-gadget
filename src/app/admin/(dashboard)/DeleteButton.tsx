'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ url, label = 'Hapus' }: { url: string; label?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.')) return
    setLoading(true)
    await fetch(url, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--bad)', background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
    >
      {loading ? '...' : label}
    </button>
  )
}
