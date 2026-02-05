import Link from 'next/link';
import WindowShadowExperiment from './components/shadow';
import LandingContent from './components/landing-content';

function TransparentNav() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-[55%] flex-row items-center justify-between px-12 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 p-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Window shadow grid - 2x2 panes with light coming through */}
            <rect x="2" y="2" width="7" height="7" rx="1" fill="white" fillOpacity="0.3" />
            <rect x="11" y="2" width="7" height="7" rx="1" fill="white" fillOpacity="0.2" />
            <rect x="2" y="11" width="7" height="7" rx="1" fill="white" fillOpacity="0.15" />
            <rect x="11" y="11" width="7" height="7" rx="1" fill="white" fillOpacity="0.1" />
          </svg>
        </div>
        <span className="text-sm font-medium text-neutral-900">lighted</span>
      </div>

      {/* Nav links + Sign in
      <div className="flex flex-row items-center gap-1 text-sm">
        <Link
          href="#"
          className="px-4 py-2 text-neutral-600 transition-colors hover:text-neutral-900"
        >
          Features
        </Link>
        <Link
          href="#"
          className="px-4 py-2 text-neutral-600 transition-colors hover:text-neutral-900"
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="px-4 py-2 text-neutral-600 transition-colors hover:text-neutral-900"
        >
          Blog
        </Link>
        <Link
          href="#"
          className="px-4 py-2 text-neutral-600 transition-colors hover:text-neutral-900"
        >
          Docs
        </Link>
        <Link
          href="#"
          className="ml-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Sign in
        </Link>
      </div> */}
    </nav>
  );
}

export default function Page() {
  return (
    <>
      {/* Layer 1 (z-0): Gray wall background */}
      <div className="fixed inset-0 z-0 bg-neutral-300" />

      {/* Layer 2 (z-10): Main content */}
      <LandingContent />

      {/* Layer 3 (z-20): Shadow overlay with mix-blend-multiply */}
      <WindowShadowExperiment asOverlay offsetX={-150} />

      {/* Layer 4 (z-50): Navigation */}
      <TransparentNav />
    </>
  );
}
