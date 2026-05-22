import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import SessionProviderWrapper from './components/SessionProviderWrapper'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <SessionProviderWrapper session={session}>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionProviderWrapper>
  )
}
