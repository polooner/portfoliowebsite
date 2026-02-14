import Link from 'next/link';

export default function GridAnimatorPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-900">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-neutral-100">Grid Animator</h1>
          <p className="max-w-md text-sm text-neutral-400">
            Design animated SVG grid patterns for loading indicators, status animations, and more.
            Draw cells, pick patterns, and export standalone React components.
          </p>
        </div>
        <Link
          href="/design-experiments/grid-animator/tool"
          className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
        >
          Open Tool
        </Link>
      </div>
    </div>
  );
}
