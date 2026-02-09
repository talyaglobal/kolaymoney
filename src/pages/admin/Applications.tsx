import { AdminLayout } from '@/components/admin/AdminLayout'
import { ApplicationsList } from '@/components/admin/ApplicationsList'

export function AdminApplications() {
  return (
    <AdminLayout>
      <ApplicationsList />
    </AdminLayout>
  )
}
