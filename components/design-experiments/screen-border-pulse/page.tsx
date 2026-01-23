"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { ScreenBorderPulse } from "../components/success-screen-pulse";
import { VercelDeployModal } from "../components/vercel-deploy-modal";

const ANIMATION_DURATION = 5000;

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const variantParam = searchParams.get("variant");
  const variant: "default" | "rainbow" = variantParam === "rainbow" ? "rainbow" : "default";

  const [pulseKey, setPulseKey] = useState(0);
  const sessionKey = `${variant}-${pulseKey}`;
  const [finishedSession, setFinishedSession] = useState<string | null>(null);
  const animationFinished = finishedSession === sessionKey;

  useEffect(() => {
    const key = sessionKey;
    const timer = setTimeout(() => setFinishedSession(key), ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [sessionKey]);

  const setVariant = (newVariant: "default" | "rainbow") => {
    router.push(`?variant=${newVariant}`, { scroll: false });
  };

  const replay = () => {
    setPulseKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center flex-col gap-4 p-8 bg-black">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => (variant === "default" && animationFinished ? replay() : setVariant("default"))}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${variant === "default"
            ? "bg-white text-black"
            : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
        >
          Default
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              width: variant === "default" && animationFinished ? 16 : 0,
              marginLeft: variant === "default" && animationFinished ? 8 : 0,
            }}
          >
            <RotateCcw className="size-3.5" strokeWidth={2.5} />
          </div>
        </button>
        <button
          onClick={() => (variant === "rainbow" && animationFinished ? replay() : setVariant("rainbow"))}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${variant === "rainbow"
            ? "bg-white text-black"
            : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
        >
          Rainbow
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              width: variant === "rainbow" && animationFinished ? 16 : 0,
              marginLeft: variant === "rainbow" && animationFinished ? 8 : 0,
            }}
          >
            <RotateCcw className="size-3.5" strokeWidth={2.5} />
          </div>
        </button>
      </div>

      <VercelDeployModal teamName="Vercel Labs" />

      <ScreenBorderPulse key={sessionKey} active variant={variant} />
    </div>
  );
}
