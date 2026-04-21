'use client'
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
        <a href="#">Berlangganan</a>
        <span>·</span>
        <a href="#">Masuk</a>
      </div>
    </div>
  )
}
