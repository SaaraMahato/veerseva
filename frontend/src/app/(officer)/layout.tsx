'use client'
import OfficerSidebar from '../../components/layout/OfficerSidebar'
import Header from '../../components/layout/Header'
import ProtectedRoute from '../../components/layout/ProtectedRoute'

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['officer', 'ministry']}>
      <div className="min-h-screen bg-gray-50">
        <OfficerSidebar />
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