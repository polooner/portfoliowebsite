import Link from 'next/link';
import Image from 'next/image';

export function SunlightDropCard() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between">
        <span className="font-bold">SUNLIGHT DROP TOOL</span>
      </div>

      <Link href="/design-experiments/sunlight-drop" target="_blank" className="group block">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-300 transition-transform duration-200 ease-out group-hover:scale-95">
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <span className="text-4xl font-bold font-mono text-neutral-800 text-center leading-tight px-6">
              drop sunlight
              <br />
              on your UI.
            </span>
          </div>

          {/* Window shadow overlay */}
          <svg
            className="absolute inset-0 w-full h-full z-10 mix-blend-multiply"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 780 1010"
            preserveAspectRatio="xMinYMid slice"
          >
            <defs>
              <filter
                id="sunlight-card-blur"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
              </filter>
              <linearGradient
                id="sunlight-card-fade"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="sunlight-card-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#sunlight-card-fade)" />
              </mask>
            </defs>
            <g mask="url(#sunlight-card-mask)">
              <rect x="0" y="0" width="100%" height="100%" fill="#737373" />
              <g
                filter="url(#sunlight-card-blur)"
                transform="translate(50, 200) skewX(5) skewY(20)"
              >
                <rect x="0" y="0" width="180" height="180" fill="white" />
                <rect x="200" y="0" width="180" height="180" fill="white" />
                <rect x="0" y="195" width="180" height="180" fill="white" />
                <rect x="200" y="195" width="180" height="180" fill="white" />
                <rect x="0" y="390" width="180" height="180" fill="white" />
                <rect x="200" y="390" width="180" height="180" fill="white" />
                <rect x="0" y="585" width="180" height="180" fill="white" />
                <rect x="200" y="585" width="180" height="180" fill="white" />
              </g>
            </g>
          </svg>

          {/* Screenshot fade-in on hover */}
          <Image
            src="/sunlight-drop-demo.png"
            alt="Sunlight Drop tool demo"
            width={800}
            height={900}
            className="absolute inset-0 w-full h-full object-cover scale-125 z-20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        </div>
      </Link>
    </div>
  );
}
