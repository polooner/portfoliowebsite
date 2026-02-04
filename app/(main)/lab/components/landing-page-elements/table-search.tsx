import { Typewriter } from "@/app/(main)/lab/components/landing-page-elements/typewriter/typewriter";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react";

type SalesDemoPhase =
    | 'cursor-entering'
    | 'clicking'
    | 'typing'
    | 'expanding'
    | 'complete'
    | 'cursor-to-clear'
    | 'clicking-clear'
    | 'clearing';

const salesTableData = [
    { name: 'Sarah Mitchell', score: 94, status: 'Hot' },
    { name: 'James Chen', score: 87, status: 'Warm' },
    { name: 'Emily Rodriguez', score: 82, status: 'Warm' },
];

const searchQuery = 'High intent homeowners in Austin';

export function TableSearchAnimation() {
    const [phase, setPhase] = useState<SalesDemoPhase>('cursor-entering');
    const [showTable, setShowTable] = useState(false);
    const [loopKey, setLoopKey] = useState(0);

    // Start the animation sequence and loop forever
    React.useEffect(() => {
        // Timeline:
        // 0ms: cursor starts entering (moving from bottom-right to input)
        // 700ms: cursor arrives, click animation starts
        // 850ms: click done, cursor fades, typing starts
        const t1 = setTimeout(() => setPhase('clicking'), 700);
        const t2 = setTimeout(() => setPhase('typing'), 850);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [loopKey]);

    const handleTypingComplete = () => {
        // After typing completes, expand table
        setTimeout(() => setPhase('expanding'), 200);
        setTimeout(() => setPhase('complete'), 400);
        // After rows blur in, start the clear sequence
        setTimeout(() => setPhase('cursor-to-clear'), 1800);
        setTimeout(() => setPhase('clicking-clear'), 2500);
        setTimeout(() => setPhase('clearing'), 2650);
        // After clearing animation, restart the loop
        setTimeout(() => {
            setShowTable(false);
            setPhase('cursor-entering');
            setLoopKey((k) => k + 1);
        }, 3200);
    };

    const isExpanded = ['expanding', 'complete', 'cursor-to-clear', 'clicking-clear'].includes(phase);
    const isClearing = phase === 'clearing';
    const showCursorEntering = phase === 'cursor-entering' || phase === 'clicking';
    const showCursorClearing = phase === 'cursor-to-clear' || phase === 'clicking-clear';
    const shouldType = ['typing', 'expanding', 'complete', 'cursor-to-clear', 'clicking-clear'].includes(phase);
    const showStaticText = ['expanding', 'complete', 'cursor-to-clear', 'clicking-clear'].includes(phase);
    const showClearButton = ['typing', 'expanding', 'complete', 'cursor-to-clear', 'clicking-clear'].includes(phase);

    return (
        <div className="relative h-[240px]">
            {/* Command palette container - starts as just search, expands to include table */}
            <motion.div
                className="absolute left-0 right-0 bg-white border border-border overflow-hidden"
                initial={{ top: '50%', y: '-50%', borderRadius: 12 }}
                animate={{
                    top: (isExpanded && !isClearing) ? '0%' : '50%',
                    y: (isExpanded && !isClearing) ? 0 : '-50%',
                    borderRadius: (isExpanded && !isClearing) ? 16 : 12,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onAnimationComplete={() => {
                    if (isExpanded && !isClearing) setShowTable(true);
                }}
            >
                {/* Search input pill */}
                <div className="p-2.5">
                    <div className="flex items-center bg-gray-50 border border-border rounded-lg pl-3 pr-2">
                        <Search className="w-3.5 h-3.5 text-muted-foreground" />
                        <div className="flex-1 px-3 py-2 text-sm text-foreground">
                            {showStaticText ? (
                                searchQuery
                            ) : (
                                <Typewriter
                                    key={loopKey}
                                    speed="fast"
                                    play={shouldType}
                                    onComplete={handleTypingComplete}
                                    cursorStyle={{ background: 'currentColor', width: 1 }}
                                    cursorBlinkRepeat={0}
                                >
                                    {searchQuery}
                                </Typewriter>
                            )}
                        </div>
                        {/* Clear button */}
                        <AnimatePresence>
                            {showClearButton && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: phase === 'clicking-clear' ? [1, 0.7, 1] : 1
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={phase === 'clicking-clear' ? {
                                        scale: { duration: 0.15, times: [0, 0.4, 1], ease: 'easeOut' }
                                    } : { duration: 0.15 }}
                                    className="p-0.5 rounded text-muted-foreground"
                                >
                                    <X className="w-3 h-3" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Table content - fades and slides in after expansion */}
                <AnimatePresence>
                    {showTable && !isClearing && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {/* Table header */}
                            <div className="grid grid-cols-3 gap-2 px-4 py-2 border-t border-border text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                <span>Name</span>
                                <span>Score</span>
                                <span>Status</span>
                            </div>

                            {/* Table rows with staggered blur-in */}
                            {salesTableData.map((row, i) => (
                                <motion.div
                                    key={row.name}
                                    className="grid grid-cols-3 gap-2 px-4 py-2.5 border-t border-border text-sm"
                                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                                    animate={['complete', 'cursor-to-clear', 'clicking-clear'].includes(phase) ? { opacity: 1, filter: 'blur(0px)' } : {}}
                                    transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                                >
                                    <span className="text-foreground font-medium">{row.name}</span>
                                    <span className="text-foreground">{row.score}</span>
                                    <span
                                        className={`inline-flex items-center w-fit px-2 py-0.5 rounded-full text-xs font-medium ${row.status === 'Hot' ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'}`}
                                    >
                                        {row.status}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Animated cursor - entry sequence */}
            <AnimatePresence>
                {showCursorEntering && (
                    <motion.div
                        key={`cursor-enter-${loopKey}`}
                        className="absolute pointer-events-none z-10"
                        animate={{
                            x: 120,
                            y: 120,
                            scale: phase === 'clicking' ? [1, 0.7, 1] : 1,
                            opacity: 1,
                        }}
                        initial={{
                            x: 380,
                            y: 200,
                            opacity: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={phase === 'clicking' ? {
                            scale: { duration: 0.15, times: [0, 0.4, 1], ease: 'easeOut' },
                            opacity: { duration: 0.15 },
                        } : {
                            x: { duration: 0.7, ease: [0, 0, 0.2, 1] },
                            y: { duration: 0.7, ease: [0.8, 0, 1, 1] },
                            opacity: { duration: 0.3 },
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M1 1L6 14L8 8L14 6L1 1Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated cursor - clear sequence */}
            <AnimatePresence>
                {showCursorClearing && (
                    <motion.div
                        key={`cursor-clear-${loopKey}`}
                        className="absolute pointer-events-none z-10"
                        animate={{
                            x: 438,
                            y: 28,
                            scale: phase === 'clicking-clear' ? [1, 0.7, 1] : 1,
                            opacity: 1,
                        }}
                        initial={{
                            x: 380,
                            y: 200,
                            opacity: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={phase === 'clicking-clear' ? {
                            scale: { duration: 0.15, times: [0, 0.4, 1], ease: 'easeOut' },
                            opacity: { duration: 0.15 },
                        } : {
                            x: { duration: 0.7, ease: [0, 0, 0.2, 1] },
                            y: { duration: 0.7, ease: [0.8, 0, 1, 1] },
                            opacity: { duration: 0.3 },
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M1 1L6 14L8 8L14 6L1 1Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}