import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import GadgetForm from '../../GadgetForm'

type Props = { params: Promise<{ id: string }> }

export default async function EditGadgetPage({ params }: Props) {
  const { id } = await params
  const gadget = await prisma.gadget.findUnique({ where: { id } })
  if (!gadget) notFound()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/gadgets" className="mono xsmall mute" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ← Kembali
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: 0 }}>
          Edit Gadget
        </h1>
        <div className="mono xsmall mute" style={{ marginTop: 4 }}>{gadget.brand} {gadget.name}</div>
      </div>
      <GadgetForm initialData={{
        id: gadget.id,
        name: gadget.name,
        brand: gadget.brand,
        slug: gadget.slug,
        description: gadget.description,
        category: gadget.category,
        rating: gadget.rating,
        coverImage: gadget.coverImage,
        published: gadget.published,
        specs: gadget.specs,
        ctaLinks: gadget.ctaLinks,
      }} />
    </div>
  )
}
