import { prisma } from './prisma'

export async function validateApiKey(key: string | null): Promise<boolean> {
  if (!key) return false

  const apiKey = await prisma.apiKey.findUnique({
    where: { key, isActive: true },
  })

  if (!apiKey) return false

  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsed: new Date() },
  })

  return true
}
