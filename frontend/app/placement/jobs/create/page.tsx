import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { JobCreationForm } from "@/components/jobs/job-creation-form"

export default function CreateJobPage() {
  return (
    <DashboardLayout userRole="placement">
      <div className="p-6">
        <JobCreationForm />
      </div>
    </DashboardLayout>
  )
}
