'use client'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import ProtectedRoute from '../../components/layout/ProtectedRoute'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['veteran']}>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main style={{ marginLeft: '256px', paddingTop: '64px', minHeight: '100vh' }}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}