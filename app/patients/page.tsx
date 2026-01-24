import { MainLayout } from '@/components/layout/main-layout';
import { PatientsContent } from '@/components/patients/patients-content';

export default function PatientsPage() {
  return (
    <MainLayout currentPage="patients">
      <PatientsContent />
    </MainLayout>
  );
}
