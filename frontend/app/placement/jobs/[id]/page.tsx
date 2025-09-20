import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { JobDetailView } from "@/components/jobs/job-detail-view"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  return (
    <DashboardLayout userRole="placement">
      <div className="p-6">
        <JobDetailView jobId={params.id} userRole="placement" />
      </div>
    </DashboardLayout>
  )
}
