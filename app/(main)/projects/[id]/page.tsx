import { notFound } from 'next/navigation';
import { PROJECTS } from '../../_data/projects';
import { ProjectDetail } from '../../_components/project-detail';

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return {};
  return { title: `${project.name} — Filip Wojda` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
