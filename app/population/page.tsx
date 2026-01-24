import { MainLayout } from '@/components/layout/main-layout';
import { PopulationHealthRadarContent } from '@/components/population/population-health-radar-content';

export default function PopulationPage() {
  return (
    <MainLayout currentPage="population">
      <PopulationHealthRadarContent />
    </MainLayout>
  );
}
