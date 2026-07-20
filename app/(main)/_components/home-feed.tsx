'use client';

import { useState } from 'react';
import { PROJECTS, type Project } from '../_data/projects';
import { ProjectDetail } from './project-detail';
import { SiteContact } from './site-contact';
import { SiteHeader } from './site-header';
import { SiteNav } from './site-nav';

const WORK_PROJECTS = PROJECTS.filter((p) => p.kind === 'work');
const TOOL_PROJECTS = PROJECTS.filter((p) => p.kind === 'tool');
const JOB_PROJECTS = PROJECTS.filter((p) => p.kind === 'job');

const DEFAULT_PROJECT =
  PROJECTS.find((p) => !p.linkOnly && p.kind !== 'job') ?? PROJECTS[0];

function formatIndex(i: number) {
  return `${i + 1}.`;
}

type ListProps = {
  title: string;
  items: Project[];
  activeId: string;
  onSelect: (id: string) => void;
  asLinks?: boolean;
};

const ITEM_CLASS_BASE =
  'feed-item text-left w-full transition-[color,filter] duration-200 text-sm leading-tight flex flex-row gap-8 cursor-pointer uppercase';

function ProjectList({ title, items, activeId, onSelect, asLinks }: ListProps) {
  return (
    <div className="flex flex-col">
      <div className="text-sm leading-tight text-red-600 mb-2">{title}</div>
      <ol className="flex flex-col">
        {items.map((p, i) => {
          const isActive = p.id === activeId;
          const colorClass = isActive
            ? 'text-red-600'
            : 'text-red-300 hover:text-red-600';
          const content = (
            <>
              <span className="w-6 shrink-0 tabular-nums">{formatIndex(i)}</span>
              <span className="flex flex-row items-baseline gap-2">
                <span>{p.name}</span>
                {p.subtext && (
                  <span className="text-xs text-red-300 normal-case">{p.subtext}</span>
                )}
                {p.defunct && (
                  <span className="text-xs text-red-300 normal-case">defunct</span>
                )}
              </span>
            </>
          );

          const showsPreview = !asLinks && !p.linkOnly;

          return (
            <li key={p.id}>
              <a
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noopener noreferrer' : undefined}
                onMouseEnter={showsPreview ? () => onSelect(p.id) : undefined}
                onFocus={showsPreview ? () => onSelect(p.id) : undefined}
                className={`${ITEM_CLASS_BASE} ${colorClass}`}
              >
                {content}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function HomeFeed() {
  const [activeId, setActiveId] = useState<string>(DEFAULT_PROJECT.id);
  const active = PROJECTS.find((p) => p.id === activeId) ?? DEFAULT_PROJECT;

  return (
    <div className="min-h-screen w-full px-8 py-8 text-sm text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <aside className="flex flex-col gap-8 md:sticky md:top-8 md:h-[calc(100vh-4rem)] md:overflow-y-auto uppercase min-h-[calc(100vh-4rem)]">
          <SiteHeader />
          <SiteNav />

          <div className="home-feed-lists flex flex-col gap-8">
            <ProjectList
              title="Selected"
              items={WORK_PROJECTS}
              activeId={active.id}
              onSelect={setActiveId}
            />

            <ProjectList
              title="Tools"
              items={TOOL_PROJECTS}
              activeId={active.id}
              onSelect={setActiveId}
            />

            <ProjectList
              title="Work"
              items={JOB_PROJECTS}
              activeId={active.id}
              onSelect={setActiveId}
              asLinks
            />
          </div>

          <SiteContact />
        </aside>

        <section className="hidden md:flex flex-col gap-8">
          <ProjectDetail project={active} />
        </section>
      </div>
    </div>
  );
}
