import TopRail from '@/components/TopRail'
import Navbar from '@/components/Navbar'

function Bone({ w = '100%', h = 16, style }: { w?: string | number; h?: number; style?: React.CSSProperties }) {
  return (
    <div
      className="ph"
      style={{
        width: w, height: h,
        background: 'var(--paper-3)',
        animation: 'pulse 1.6s ease-in-out infinite',
        ...style,
      }}
    />
  )
}

export default function PageSkeleton({ variant = 'feed' }: { variant?: 'feed' | 'hero' | 'grid' }) {
  return (
    <>
      <TopRail />
      <Navbar />
      <div style={{ borderTop: '1px solid var(--rule)' }} />
      <div className="container" style={{ padding: '40px 28px' }}>
        {variant === 'hero' && (
          <>
            <Bone w="60%" h={14} style={{ marginBottom: 16 }} />
            <Bone w="90%" h={52} style={{ marginBottom: 12 }} />
            <Bone w="70%" h={20} style={{ marginBottom: 32 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Bone w="100%" h={180} style={{ marginBottom: 12 }} />
                  <Bone w="40%" h={11} style={{ marginBottom: 8 }} />
                  <Bone w="85%" h={18} style={{ marginBottom: 6 }} />
                  <Bone w="50%" h={12} />
                </div>
              ))}
            </div>
          </>
        )}
        {variant === 'feed' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Bone w="100%" h={180} style={{ marginBottom: 12 }} />
                <Bone w="35%" h={11} style={{ marginBottom: 8 }} />
                <Bone w="90%" h={20} style={{ marginBottom: 6 }} />
                <Bone w="60%" h={14} style={{ marginBottom: 6 }} />
                <Bone w="40%" h={12} />
              </div>
            ))}
          </div>
        )}
        {variant === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Bone w="100%" h={220} style={{ marginBottom: 12 }} />
                <Bone w="45%" h={11} style={{ marginBottom: 8 }} />
                <Bone w="80%" h={18} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
