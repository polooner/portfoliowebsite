"use client"

import { TransitionLink } from "./transition-link"
import { MiniLogo } from "./mini-logo"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Experiment {
  name: string
  path: string
}

interface ExperimentNavProps {
  experiments: Experiment[]
}

export function ExperimentNav({ experiments }: ExperimentNavProps) {
  const pathname = usePathname()

  // Only show on child pages, not on /design-experiments itself
  if (pathname === "/design-experiments") {
    return null
  }

  const currentIndex = experiments.findIndex((e) => e.path === pathname)
  const prev = currentIndex > 0 ? experiments[currentIndex - 1] : null
  const next = currentIndex < experiments.length - 1 ? experiments[currentIndex + 1] : null

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 border-t border-white/10 flex items-center justify-between px-6 bg-background">
      <MiniLogo />
      {prev ? (
        <TransitionLink
          href={prev.path}
          className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{prev.name}</span>
        </TransitionLink>
      ) : (
        <div />
      )}

      {next ? (
        <TransitionLink
          href={next.path}
          className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
        >
          <span>{next.name}</span>
          <ChevronRight className="w-4 h-4" />
        </TransitionLink>
      ) : (
        <div />
      )}
    </nav>
  )
}
