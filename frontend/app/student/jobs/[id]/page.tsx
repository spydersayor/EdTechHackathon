import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { JobDetailView } from "@/components/jobs/job-detail-view"

interface StudentJobDetailPageProps {
  params: {
    id: string
  }
}

export default function StudentJobDetailPage({ params }: StudentJobDetailPageProps) {
  return (
    <DashboardLayout userRole="student">
      <div className="p-6">
        <JobDetailView jobId={params.id} userRole="student" />
      </div>
    </DashboardLayout>
  )
}
