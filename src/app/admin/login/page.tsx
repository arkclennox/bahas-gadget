'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })

      if (!res.ok) {
        setError('Password salah.')
        setLoading(false)
        return
      }

      router.push('/admin/articles')
    } catch {
      setError('Network error.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--paper)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: 360 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, letterSpacing: '-0.04em' }}>
            Bahas<span style={{ color: 'var(--accent)' }}>/</span>Gadget
          </div>
          <div className="mono xsmall uppercase mute" style={{ marginTop: 6 }}>Admin Dashboard</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-dim)', marginBottom: 6 }}>
              Admin Password
            </label>
            <input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              required
              autoFocus
              style={{ display: 'block', width: '100%', background: 'var(--paper-2)', border: '1px solid var(--rule)', color: 'var(--ink)', padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' }}
            />
          </div>

          {error && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--bad)', marginBottom: 12 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
