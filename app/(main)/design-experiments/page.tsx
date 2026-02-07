import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function getExperimentSlugs() {
  const experimentsDir = path.join(process.cwd(), 'app', 'design-experiments');

  if (!fs.existsSync(experimentsDir)) return [];

  return fs
    .readdirSync(experimentsDir, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false;
      const hasPage = fs.existsSync(
        path.join(experimentsDir, entry.name, 'page.tsx')
      );
      return hasPage;
    })
    .map((entry) => entry.name);
}

function formatSlug(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function DesignExperimentsPage() {
  const slugs = getExperimentSlugs();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
        Design Experiments
      </h1>
      <div className="flex flex-col gap-3">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={`/design-experiments/${slug}`}
            className="rounded-xl border border-neutral-200 bg-white px-6 py-4 text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
          >
            {formatSlug(slug)}
          </Link>
        ))}
      </div>
    </div>
  );
}
