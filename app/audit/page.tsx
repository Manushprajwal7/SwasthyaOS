import { MainLayout } from '@/components/layout/main-layout';
import { AuditContent } from '@/components/audit/audit-content';

export default function AuditPage() {
  return (
    <MainLayout currentPage="audit">
      <AuditContent />
    </MainLayout>
  );
}
