import { MainLayout } from '@/components/layout/main-layout';
import { ClinicianWorkspaceContent } from '@/components/clinician/clinician-workspace-content';

export default function ClinicianPage() {
  return (
    <MainLayout currentPage="clinician">
      <ClinicianWorkspaceContent />
    </MainLayout>
  );
}
