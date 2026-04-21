'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import CTAButtons from '@/components/CTAButtons'

export default function ArticleBody({ content, ctaLinks }: { content: string; ctaLinks: unknown }) {
  const [readerMode, setReaderMode] = useState<'dark' | 'paper'>('dark')
  const [fontSize, setFontSize] = useState(19)

  return (
    <>
      {/* Reader Controls */}
      <div className="container" style={{ padding: '10px 28px', borderBottom: '1px solid var(--rule)' }}>
        <div className="reader-controls" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>Reader</span>
            <button className={readerMode === 'dark' ? 'active' : ''} onClick={() => setReaderMode('dark')}>Dark</button>
            <button className={readerMode === 'paper' ? 'active' : ''} onClick={() => setReaderMode('paper')}>Paper</button>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>Type</span>
            <button onClick={() => setFontSize(s => Math.max(15, s - 1))}>A−</button>
            <span className="mono xsmall">{fontSize}px</span>
            <button onClick={() => setFontSize(s => Math.min(24, s + 1))}>A+</button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div
        className="reader"
        style={{
          fontSize,
          background: readerMode === 'paper' ? '#ece7dc' : 'var(--paper)',
          color: readerMode === 'paper' ? '#141312' : 'var(--ink)',
        }}
      >
        <ReactMarkdown
          components={{
            h2: ({ children }) => <h2>{children}</h2>,
            p: ({ children }) => <p>{children}</p>,
            blockquote: ({ children }) => (
              <div className="pull">{children}</div>
            ),
          }}
        >
          {content}
        </ReactMarkdown>

        <CTAButtons ctaLinks={ctaLinks} />
      </div>
    </>
  )
}
