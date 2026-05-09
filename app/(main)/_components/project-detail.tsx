import Link from 'next/link';
import type { Project } from '../_data/projects';
import { ProjectMediaTile } from './project-media';

type Props = {
  project: Project;
};

export function ProjectDetail({ project }: Props) {
  const visitLabel = project.external ? 'Visit' : 'Open';

  return (
    <article className="flex flex-col gap-6 max-w-[520px] text-lg">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl leading-tight">{project.name}</h1>
        <div className="uppercase">
          {project.role && <div className="font-medium">{project.role}</div>}
          <div className="italic text-neutral-600">{project.year}</div>
          <div className="text-neutral-500">{project.tags}</div>
        </div>
      </header>

      {project.media.length > 0 && (
        <div className="flex flex-col gap-6">
          {project.media.map((m, i) => (
            <div key={`${project.id}-${i}`} className="flex flex-col gap-2">
              <div className="w-full aspect-square overflow-hidden">
                <ProjectMediaTile media={m} />
              </div>
              {m.caption && (
                <p className="text-sm text-neutral-500 italic">{m.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-neutral-700 leading-relaxed">
        {project.description}
      </p>

      <Link
        href={project.href}
        target={project.external ? '_blank' : undefined}
        className="text-neutral-500 hover:text-black underline-offset-2 hover:underline w-fit"
      >
        [{visitLabel}]
      </Link>
    </article>
  );
}
