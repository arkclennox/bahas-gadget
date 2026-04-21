'use client'
import ReactMarkdown from 'react-markdown'
import CTAButtons from '@/components/CTAButtons'

export default function ArticleBody({ content, ctaLinks }: { content: string; ctaLinks: unknown }) {
  return (
    <div className="reader">
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
  )
}
