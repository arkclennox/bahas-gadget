import { cookies } from 'next/headers'

export async function validateAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')
  return !!session && session.value === process.env.ADMIN_SECRET
}
