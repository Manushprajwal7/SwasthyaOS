import { MainLayout } from '@/components/layout/main-layout';
import { RuralDecisionSupportContent } from '@/components/rural/rural-decision-support-content';

export default function RuralPage() {
  return (
    <MainLayout currentPage="rural">
      <RuralDecisionSupportContent />
    </MainLayout>
  );
}
