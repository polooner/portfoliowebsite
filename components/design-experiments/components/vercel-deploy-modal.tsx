"use client";

function VercelLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 76 65"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  );
}

function BranchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function SpeedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

interface NextStepItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  showArrow?: boolean;
}

function NextStepItem({
  icon,
  title,
  description,
  showArrow = false,
}: NextStepItemProps) {
  return (
    <div className="flex items-center gap-4 py-3 px-1 group cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-neutral-800/50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-medium">{title}</div>
        <div className="text-neutral-400 text-sm">{description}</div>
      </div>
      {showArrow && (
        <ArrowRightIcon className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
      )}
    </div>
  );
}

interface VercelDeployModalProps {
  projectName?: string;
  teamName?: string;
  previewImage?: string;
  onContinue?: () => void;
}

export function VercelDeployModal({
  projectName = "my-project",
  teamName = "Vercel Labs",
  previewImage,
  onContinue,
}: VercelDeployModalProps) {
  return (
    <div className="w-full max-w-[560px] bg-black rounded-xl overflow-hidden border border-neutral-800">
      <div className="p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          Congratulations!
        </h1>
        <p className="text-neutral-400 text-sm flex items-center gap-2 mb-6">
          You just deployed a new project to
          <span className="inline-flex items-center gap-1.5 text-white">
            <VercelLogo className="w-3 h-3" />
            {teamName}.
          </span>
        </p>

        {/* Preview area */}
        <div className="relative w-full aspect-[640/400] rounded-lg border border-neutral-800 bg-neutral-900/50 mb-8 overflow-hidden">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Deployment preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-600 text-4xl font-light tracking-wider">
                640 × 400
              </span>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h2 className="text-neutral-400 text-xs font-medium uppercase tracking-wide mb-2">
            Next Steps
          </h2>
          <div className="space-y-1">
            <NextStepItem
              icon={<BranchIcon className="w-5 h-5 text-neutral-400" />}
              title="Instant Previews"
              description="Push a new branch to preview changes instantly"
            />
            <NextStepItem
              icon={<GlobeIcon className="w-5 h-5 text-neutral-400" />}
              title="Add Domain"
              description="Add a custom domain to your project"
              showArrow
            />
            <NextStepItem
              icon={<SpeedIcon className="w-5 h-5 text-neutral-400" />}
              title="Enable Speed Insights"
              description="Track how users experience your site over time"
              showArrow
            />
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="w-full py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
