import { notFound } from 'next/navigation';
import { missionaryService } from '@/services';
import MissionaryDetail from '@/components/missionary/MissionaryDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MissionaryPage({ params }: PageProps) {
  const { id } = await params;
  const missionary = await missionaryService.getById(id);

  if (!missionary) {
    notFound();
  }

  return <MissionaryDetail missionary={missionary} />;
}
