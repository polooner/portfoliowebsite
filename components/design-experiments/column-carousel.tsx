"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, useCallback, useRef, useMemo } from "react"

interface ColumnCarouselProps {
    words?: string[]
    lineHeight?: number // Height of each text line in pixels
    visibleLines?: number // How many word slots are visible (1, 3, 5, etc.)
    pauseMs?: number
    fastMs?: number
    slowMs?: number
    easeDistance?: number
    className?: string
    activeColor?: string
    inactiveColor?: string
}

export default function ColumnCarousel({
    words = ["design", "clarity", "speed", "details"],
    lineHeight = 48, // Natural line height for the text
    visibleLines = 1, // Default to single word visible
    pauseMs = 350,
    fastMs = 110,
    slowMs = 200,
    easeDistance = 8,
    className = "",
    activeColor = "black",
    inactiveColor = "rgb(180,180,180)"
}: ColumnCarouselProps) {
    const itemCount = words.length

    // Memoize extended words to prevent recreation every render
    const extendedWords = useMemo(
        () => [...words, ...words, ...words],
        [words]
    )

    const [currentIndex, setCurrentIndex] = useState(itemCount)
    const [phase, setPhase] = useState<"rest" | "slow-out" | "fast-swap" | "slow-in">("rest")
    const [isResetting, setIsResetting] = useState(false)
    const [activeWordIndex, setActiveWordIndex] = useState(itemCount)

    // Refs for transition state to avoid interval recreation
    const isTransitioning = useRef(false)
    const currentIndexRef = useRef(itemCount)
    const activeWordIndexRef = useRef(itemCount)

    // Deterministic centering based on visibleLines
    const centerOffset = (visibleLines - 1) / 2
    const containerHeight = visibleLines * lineHeight

    const startTransition = useCallback(() => {
        // Transition guard to prevent overlapping transitions
        if (isTransitioning.current || itemCount <= 1) return
        isTransitioning.current = true

        setPhase("slow-out")

        // Trigger color change near end of movement so it's grey right as motion stops
        setTimeout(() => {
            const newActiveIndex = activeWordIndexRef.current + 1
            activeWordIndexRef.current = newActiveIndex
            setActiveWordIndex(newActiveIndex)
        }, slowMs + fastMs - 180)

        setTimeout(() => {
            setPhase("fast-swap")

            setTimeout(() => {
                setPhase("slow-in")

                setTimeout(() => {
                    // Use refs to calculate next values synchronously
                    const nextIndex = currentIndexRef.current + 1
                    const needsReset = nextIndex >= itemCount * 2

                    if (needsReset) {
                        currentIndexRef.current = itemCount
                        activeWordIndexRef.current = itemCount
                        setIsResetting(true)
                        setCurrentIndex(itemCount)
                        setActiveWordIndex(itemCount)
                    } else {
                        currentIndexRef.current = nextIndex
                        setCurrentIndex(nextIndex)
                    }
                    setPhase("rest")
                    isTransitioning.current = false
                }, slowMs)
            }, fastMs)
        }, slowMs)
    }, [itemCount, slowMs, fastMs])

    useEffect(() => {
        if (isResetting) {
            const frame = requestAnimationFrame(() => {
                setIsResetting(false)
            })
            return () => cancelAnimationFrame(frame)
        }
    }, [isResetting])

    useEffect(() => {
        if (itemCount <= 1) return

        const interval = setInterval(() => {
            startTransition()
        }, pauseMs + slowMs + fastMs + slowMs)

        return () => clearInterval(interval)
    }, [itemCount, pauseMs, slowMs, fastMs, startTransition])


    // Memoize column style to prevent recreation every render
    const columnStyle = useMemo(() => {
        const baseY = -(currentIndex - centerOffset) * lineHeight
        let extraY = 0
        let transition = "none"

        if (isResetting) {
            return {
                transform: `translateY(${baseY}px)`,
                transition: "none"
            }
        }

        switch (phase) {
            case "rest":
                extraY = 0
                break
            case "slow-out":
                extraY = -easeDistance
                transition = `transform ${slowMs}ms cubic-bezier(0.8, 0, 1, 1)`
                break
            case "fast-swap":
                extraY = -lineHeight + easeDistance
                transition = `transform ${fastMs}ms cubic-bezier(0.4, 0, 0.6, 1)`
                break
            case "slow-in":
                extraY = -lineHeight
                transition = `transform ${slowMs}ms cubic-bezier(0, 0, 0.2, 1)`
                break
        }

        return {
            transform: `translateY(${baseY + extraY}px)`,
            transition
        }
    }, [currentIndex, centerOffset, lineHeight, isResetting, phase, easeDistance, slowMs, fastMs])

    if (itemCount <= 1) {
        return (
            <div
                style={{ lineHeight: `${lineHeight}px` }}
                className={cn(className)}
            >
                {words[0]}
            </div>
        )
    }

    return (
        <div
            style={{ height: containerHeight }}
            className={cn("overflow-hidden", className)}
        >
            <div
                style={{
                    ...columnStyle,
                    willChange: "transform",
                }}
            >
                {extendedWords.map((word, index) => {
                    const isActive = index === activeWordIndex
                    return (
                        <div
                            key={`${word}-${index}`}
                            style={{
                                height: lineHeight,
                                lineHeight: `${lineHeight}px`,
                                display: "flex",
                                alignItems: "center",
                                color: isActive ? activeColor : inactiveColor,
                                transition: isResetting ? "none" : "color 200ms ease-out",
                            }}
                        >
                            {word}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
