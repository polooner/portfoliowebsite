'use client';

import { Link } from 'next-view-transitions';
import { useState } from 'react';
import { PROJECTS, type Project } from '../_data/projects';
import { ProjectDetail } from './project-detail';
import { SiteContact } from './site-contact';
import { SiteHeader } from './site-header';
import { SiteNav } from './site-nav';

const WORK_PROJECTS = PROJECTS.filter((p) => p.kind === 'work');
const TOOL_PROJECTS = PROJECTS.filter((p) => p.kind === 'tool');

function formatIndex(i: number) {
  return `${i + 1}.`;
}

type ListProps = {
  title: string;
  items: Project[];
  activeId: string;
  onHover: (id: string) => void;
};

function ProjectList({ title, items, activeId, onHover }: ListProps) {
  return (
    <div className="flex flex-col">
      <div className="text-2xl leading-tight text-neutral-500 mb-2">{title}</div>
      <ol className="flex flex-col">
        {items.map((p, i) => {
          const isActive = p.id === activeId;
          return (
            <li key={p.id}>
              <Link
                href={`/projects/${p.id}`}
                onMouseEnter={() => onHover(p.id)}
                onFocus={() => onHover(p.id)}
                className={`text-left w-full transition-colors text-2xl leading-tight flex flex-row gap-8 ${
                  isActive ? 'text-black' : 'text-neutral-500 hover:text-black'
                }`}
              >
                <span className="w-6 shrink-0 tabular-nums">{formatIndex(i)}</span>
                <span className="flex flex-row items-baseline gap-2">
                  <span>{p.name}</span>
                  {p.defunct && (
                    <span className="text-xs text-neutral-400 normal-case">defunct</span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function HomeFeed() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <div className="min-h-screen w-full px-8 py-8 text-sm text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <aside className="flex flex-col gap-8 md:sticky md:top-8 md:h-[calc(100vh-4rem)] md:overflow-y-auto uppercase min-h-[calc(100vh-4rem)]">
          <SiteHeader />
          <SiteNav />

          <ProjectList
            title="Selected"
            items={WORK_PROJECTS}
            activeId={active.id}
            onHover={setActiveId}
          />

          <ProjectList
            title="Tools"
            items={TOOL_PROJECTS}
            activeId={active.id}
            onHover={setActiveId}
          />

          <SiteContact />
        </aside>

        <section className="hidden md:flex flex-col gap-8">
          <ProjectDetail project={active} />
        </section>
      </div>
    </div>
  );
}
