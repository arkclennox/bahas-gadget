'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchInput({ initialValue }: { initialValue: string }) {
  const router = useRouter()
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // ⌘K shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) router.push(`/cari?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, alignItems: 'center', maxWidth: 640 }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <svg
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-mute)', pointerEvents: 'none' }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Cari gadget, review, berita..."
          style={{
            display: 'block', width: '100%',
            background: 'var(--paper)', border: '1px solid var(--ink)',
            color: 'var(--ink)', padding: '12px 14px 12px 42px',
            fontFamily: 'var(--font-body)', fontSize: 17, outline: 'none',
          }}
        />
      </div>
      <button type="submit" className="btn btn-accent" style={{ whiteSpace: 'nowrap' }}>
        Cari
      </button>
    </form>
  )
}
