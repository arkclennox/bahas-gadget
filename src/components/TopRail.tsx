'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function TopRail() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const t = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  const fmt = time
    ? time.toLocaleString('id-ID', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div className="rail">
      <div className="rail-inner">
        <span><span className="dot" />Live reviews</span>
        <span className="uppercase">{fmt}</span>
        <span className="spacer" />
        <Link href="/berlangganan">Berlangganan</Link>
      </div>
    </div>
  )
}
