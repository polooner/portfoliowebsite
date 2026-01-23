"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, useCallback } from "react"

export default function SnapEaseCarousel({
    words = ["design", "clarity", "speed", "details"],
    height = 60,
    pauseMs = 500,
    fastMs = 150,
    slowMs = 250,
    easeDistance = 5,
    className = ""
}) {
    const itemCount = words.length

    const [outgoingIndex, setOutgoingIndex] = useState(0)
    const [incomingIndex, setIncomingIndex] = useState(1)
    const [phase, setPhase] = useState("rest")

    const startTransition = useCallback(() => {
        if (itemCount <= 1) return

        setPhase("slow-out")

        setTimeout(() => {
            setPhase("fast-swap")

            setTimeout(() => {
                setPhase("slow-in")

                setTimeout(() => {
                    setOutgoingIndex((i) => (i + 1) % itemCount)
                    setIncomingIndex((i) => (i + 1) % itemCount)
                    setPhase("rest")
                }, slowMs)
            }, fastMs)
        }, slowMs)
    }, [itemCount, slowMs, fastMs])

    useEffect(() => {
        if (itemCount <= 1) return

        const interval = setInterval(() => {
            startTransition()
        }, pauseMs + slowMs + fastMs + slowMs)

        return () => clearInterval(interval)
    }, [itemCount, pauseMs, slowMs, fastMs, startTransition])

    const getOutgoingStyle = () => {
        let y = 0
        let transition = "none"

        switch (phase) {
            case "rest":
                y = 0
                break
            case "slow-out":
                y = -easeDistance
                transition = `transform ${slowMs}ms cubic-bezier(0.8, 0, 1, 1)`
                break
            case "fast-swap":
                y = -height
                transition = `transform ${fastMs}ms cubic-bezier(0.4, 0, 1, 1)`
                break
            case "slow-in":
                y = -height
                break
        }

        return { transform: `translateY(${y}px)`, transition }
    }

    const getIncomingStyle = () => {
        let y = height
        let opacity = 0
        let transition = "none"

        switch (phase) {
            case "rest":
            case "slow-out":
                y = height
                opacity = 0
                break
            case "fast-swap":
                y = easeDistance
                opacity = 1
                transition = `transform ${fastMs}ms cubic-bezier(0, 0, 0.6, 1), opacity ${fastMs * 0.5}ms`
                break
            case "slow-in":
                y = 0
                opacity = 1
                transition = `transform ${slowMs}ms cubic-bezier(0, 0, 0.2, 1)`
                break
        }

        return { transform: `translateY(${y}px)`, opacity, transition }
    }

    const baseWordStyle = {
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height,
        display: "flex",
        alignItems: "center",
        willChange: "transform, opacity",
    }

    if (itemCount <= 1) {
        return <div style={{ ...baseWordStyle, position: "relative" }}>{words[0]}</div>
    }

    return (
        <div style={{ position: "relative", height, overflow: "hidden" }} className={cn(className)}>
            <div style={{ ...baseWordStyle, ...getOutgoingStyle() }}>{words[outgoingIndex]}</div>
            <div style={{ ...baseWordStyle, ...getIncomingStyle() }}>{words[incomingIndex]}</div>
        </div>
    )
}