import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ResumeManager } from "@/components/resume/resume-manager"

export default function ResumeManagerPage() {
  return (
    <DashboardLayout userRole="student">
      <div className="p-6">
        <ResumeManager />
      </div>
    </DashboardLayout>
  )
}
