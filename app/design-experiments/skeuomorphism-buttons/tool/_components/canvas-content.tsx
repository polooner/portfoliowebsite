'use client';

import { useId, useMemo } from 'react';
import { CanvasBackground } from '../_types/button-config';
import { useButtonStore } from '../_store/button-store';
import {
  generateButtonStyles,
  generateOverlayStyle,
  generateHoverCss,
  generateActiveCss,
} from '../_utils/generate-css-styles';

const CHECKERBOARD_SIZE = 16;
const CHECKERBOARD_LIGHT = '#e5e5e5';
const CHECKERBOARD_DARK = '#cccccc';

function getCanvasBackgroundStyle(bg: CanvasBackground): React.CSSProperties {
  switch (bg) {
    case CanvasBackground.Light:
      return { backgroundColor: '#e5e5e5' };
    case CanvasBackground.Dark:
      return { backgroundColor: '#1a1a1a' };
    case CanvasBackground.Checkerboard:
      return {
        backgroundImage: `
          linear-gradient(45deg, ${CHECKERBOARD_DARK} 25%, transparent 25%),
          linear-gradient(-45deg, ${CHECKERBOARD_DARK} 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${CHECKERBOARD_DARK} 75%),
          linear-gradient(-45deg, transparent 75%, ${CHECKERBOARD_DARK} 75%)
        `,
        backgroundSize: `${CHECKERBOARD_SIZE}px ${CHECKERBOARD_SIZE}px`,
        backgroundPosition: `0 0, 0 ${CHECKERBOARD_SIZE / 2}px, ${CHECKERBOARD_SIZE / 2}px -${CHECKERBOARD_SIZE / 2}px, -${CHECKERBOARD_SIZE / 2}px 0px`,
        backgroundColor: CHECKERBOARD_LIGHT,
      };
  }
}

const CANVAS_BG_OPTIONS = [
  { label: 'Light', value: CanvasBackground.Light },
  { label: 'Dark', value: CanvasBackground.Dark },
  { label: 'Check', value: CanvasBackground.Checkerboard },
] as const;

export default function CanvasContent() {
  const uniqueId = useId();
  const config = useButtonStore((s) => s.config);
  const canvasBackground = useButtonStore((s) => s.canvasBackground);
  const setCanvasBackground = useButtonStore((s) => s.setCanvasBackground);

  const className = `skeu-preview-${uniqueId.replace(/:/g, '')}`;

  const buttonStyle = useMemo(() => generateButtonStyles(config), [config]);
  const overlays = useMemo(
    () => config.overlays.filter((o) => o.visible),
    [config.overlays]
  );

  const hoverCss = useMemo(() => generateHoverCss(config), [config]);
  const activeCss = useMemo(() => generateActiveCss(config), [config]);

  const scopedStyle = useMemo(() => {
    let css = '';
    if (hoverCss) css += `.${className}:hover { ${hoverCss} }`;
    if (activeCss) css += ` .${className}:active { ${activeCss} }`;
    return css;
  }, [className, hoverCss, activeCss]);

  const canvasBgStyle = useMemo(
    () => getCanvasBackgroundStyle(canvasBackground),
    [canvasBackground]
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl">
      {/* Button preview area */}
      <div
        className="flex flex-1 items-center justify-center"
        style={canvasBgStyle}
      >
        {scopedStyle && <style>{scopedStyle}</style>}

        <button className={className} style={buttonStyle}>
          {config.text.content}
          {overlays.map((overlay) => (
            <div key={overlay.id} style={generateOverlayStyle(overlay)} />
          ))}
        </button>
      </div>

      {/* Canvas background toggle */}
      <div className="flex items-center justify-center gap-1 bg-neutral-800/80 py-2">
        {CANVAS_BG_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCanvasBackground(opt.value)}
            className={`rounded-md px-3 py-1 text-[10px] font-medium transition-colors ${
              canvasBackground === opt.value
                ? 'bg-neutral-600 text-neutral-200'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
