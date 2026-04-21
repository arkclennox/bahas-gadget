import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import CompareClient from './CompareClient'

export const dynamic = 'force-dynamic'

export default async function ComparePage() {
  const gadgets = await prisma.gadget.findMany({
    where: { published: true },
    orderBy: { rating: 'desc' },
  })

  return (
    <>
      <TopRail />
      <Navbar />
      <CompareClient gadgets={gadgets} />
      <Footer />
    </>
  )
}
