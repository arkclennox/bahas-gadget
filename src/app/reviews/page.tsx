import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import ReviewsGrid from './ReviewsGrid'

export const dynamic = 'force-dynamic'

export default async function ReviewsPage() {
  const gadgets = await prisma.gadget.findMany({
    where: { published: true },
    orderBy: { rating: 'desc' },
  })

  return (
    <>
      <TopRail />
      <Navbar />
      <ReviewsGrid gadgets={gadgets} />
      <Footer />
    </>
  )
}
