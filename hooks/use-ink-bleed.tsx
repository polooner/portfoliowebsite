import { useRef, useMemo, useState, useEffect, CSSProperties } from 'react';
import {
    type InkBleedIntensity,
    type InkBleedConfig,
    getInkBleedConfig,
    getFilterValue,
    generateFilterId,
} from '@/lib/ink-bleed-utils';

export interface UseInkBleedOptions {
    intensity?: InkBleedIntensity;
    customConfig?: Partial<InkBleedConfig>;
    enabled?: boolean;
    animated?: boolean;
    animateTurbulence?: boolean;
}

export interface UseInkBleedReturn {
    ref: React.RefObject<HTMLElement | null>;
    style: CSSProperties;
    config: InkBleedConfig;
    setBlur: (blur: number) => void;
}

export function useInkBleed(options: UseInkBleedOptions = {}): UseInkBleedReturn {
    const {
        intensity = 'normal',
        customConfig,
        enabled = true,
        animated = false,
        animateTurbulence = false,
    } = options;

    const ref = useRef<HTMLElement>(null);
    const [seed, setSeed] = useState(0);
    const dynamicFilterIdRef = useRef(animateTurbulence ? generateFilterId() : null);

    // Animate turbulence seed
    useEffect(() => {
        if (!animateTurbulence) return;

        let animationId: number;
        let lastTime = 0;
        const updateInterval = 100; // Update every 100ms

        const animate = (time: number) => {
            if (time - lastTime >= updateInterval) {
                setSeed(s => (s + 1) % 1000);
                lastTime = time;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [animateTurbulence]);

    const config = useMemo(() => {
        const baseConfig = getInkBleedConfig(intensity);
        let finalConfig = customConfig ? { ...baseConfig, ...customConfig } : baseConfig;

        // Add seed to turbulence if animating
        if (animateTurbulence && finalConfig.turbulence) {
            finalConfig = {
                ...finalConfig,
                turbulence: {
                    ...finalConfig.turbulence,
                    seed,
                },
                filterId: dynamicFilterIdRef.current!,
            };
        }

        return finalConfig;
    }, [intensity, customConfig, animateTurbulence, seed]);

    const style = useMemo((): CSSProperties => {
        if (!enabled) return {};

        const filterValue = getFilterValue(config.blur, config.filterId!);

        return {
            filter: filterValue,
            WebkitFilter: filterValue,
            ...(animated && {
                transition: 'filter 0.3s ease-in-out',
            }),
            // CSS custom properties for animation control
            ['--ink-bleed-blur' as string]: `${config.blur}px`,
        };
    }, [config, enabled, animated]);

    const setBlur = (blur: number) => {
        if (ref.current) {
            ref.current.style.setProperty('--ink-bleed-blur', `${blur}px`);
            const filterValue = getFilterValue(blur, config.filterId!);
            ref.current.style.filter = filterValue;
        }
    };

    return {
        ref,
        style,
        config,
        setBlur,
    };
}
