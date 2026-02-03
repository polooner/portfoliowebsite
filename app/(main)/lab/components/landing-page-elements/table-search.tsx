import { Typewriter } from "@/app/(main)/lab/components/landing-page-elements/typewriter/typewriter";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react";

type SalesDemoPhase = 'cursor-entering' | 'clicking' | 'typing' | 'expanding' | 'complete';

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
        // Hold for 2 seconds, then restart the loop
        setTimeout(() => {
            setShowTable(false);
            setPhase('cursor-entering');
            setLoopKey((k) => k + 1);
        }, 2500);
    };

    const isExpanded = phase === 'expanding' || phase === 'complete';
    const showCursor = phase === 'cursor-entering' || phase === 'clicking';
    const shouldType = phase === 'typing' || phase === 'expanding' || phase === 'complete';
    const showStaticText = phase === 'expanding' || phase === 'complete';

    return (
        <div className="relative h-[240px]">
            {/* Command palette container - starts as just search, expands to include table */}
            <motion.div
                className="absolute left-0 right-0 bg-white border border-border overflow-hidden"
                initial={{ top: '50%', y: '-50%', borderRadius: 12 }}
                animate={{
                    top: isExpanded ? '0%' : '50%',
                    y: isExpanded ? 0 : '-50%',
                    borderRadius: isExpanded ? 16 : 12,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onAnimationComplete={() => {
                    if (isExpanded) setShowTable(true);
                }}
            >
                {/* Search input pill */}
                <div className="p-2.5">
                    <div className="flex items-center bg-gray-50 border border-border rounded-lg pl-3">
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
                    </div>
                </div>

                {/* Table content - fades and slides in after expansion */}
                <AnimatePresence>
                    {showTable && (
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
                                    animate={phase === 'complete' ? { opacity: 1, filter: 'blur(0px)' } : {}}
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

            {/* Animated cursor */}
            <motion.div
                key={loopKey}
                className="absolute pointer-events-none z-10"
                animate={{
                    x: showCursor ? 120 : 120,
                    y: showCursor ? 120 : 120,
                    scale: phase === 'clicking' ? [1, 0.7, 1] : 1,
                    opacity: showCursor ? 1 : 0,
                }}
                initial={{
                    x: 380,
                    y: 200,
                    opacity: 0,
                    scale: 1,
                }}
                transition={phase === 'clicking' ? {
                    scale: { duration: 0.15, times: [0, 0.4, 1], ease: 'easeOut' },
                    opacity: { duration: 0.15, delay: 0.1 },
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
        </div>
    );
}