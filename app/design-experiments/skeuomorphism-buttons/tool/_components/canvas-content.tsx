'use client';

import { useId, useMemo } from 'react';
import { CanvasBackground } from '../_types/button-config';
import { useButtonStore } from '../_store/button-store';
import {
  generateButtonStyles,
  generateOverlayStyle,
  generateHoverCss,
  generateActiveCss,
  generateInsetBoxShadow,
  generateTextSpanStyles,
  generateTextShimmerStyles,
  generateTextShimmerKeyframes,
  cssPropertiesToString,
} from '../_utils/generate-css-styles';
import {
  generateButtonTwClasses,
  generateInsetOverlayTwClasses,
  generateOverlayTw,
  cssPropsToTw,
} from '../_utils/generate-component-code';

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

  const scopeClass = `skeu-${uniqueId.replace(/:/g, '')}`;

  // ── Tailwind classes (same as export) ──────────────────────────────────
  const buttonTwClasses = useMemo(
    () => generateButtonTwClasses(config),
    [config]
  );

  const insetOverlayTwClasses = useMemo(
    () => generateInsetOverlayTwClasses(config),
    [config]
  );

  // ── Inset shadow value ────────────────────────────────────────────────
  const insetBoxShadow = useMemo(
    () => generateInsetBoxShadow(config.shadows),
    [config.shadows]
  );

  // ── Scoped CSS for preview rendering ───────────────────────────────────
  const scopedCss = useMemo(() => {
    const buttonStyles = generateButtonStyles(config);
    const baseCss = cssPropertiesToString(buttonStyles);

    let css = `.${scopeClass} { ${baseCss} }`;

    // Inset overlay base rule
    const transitionDur = config.hover.transitionDuration;
    css += ` .${scopeClass}-inset { box-shadow: ${insetBoxShadow}; transition: box-shadow ${transitionDur}ms ease; }`;

    const { buttonCss: hoverButtonCss, insetOverlayCss: hoverInsetCss } = generateHoverCss(config);
    if (hoverButtonCss) css += ` .${scopeClass}:hover { ${hoverButtonCss} }`;
    if (hoverInsetCss) css += ` .${scopeClass}:hover > .${scopeClass}-inset { ${hoverInsetCss} }`;

    const { buttonCss: activeButtonCss, insetOverlayCss: activeInsetCss } = generateActiveCss(config);
    if (activeButtonCss) css += ` .${scopeClass}:active { ${activeButtonCss} }`;
    if (activeInsetCss) css += ` .${scopeClass}:active > .${scopeClass}-inset { ${activeInsetCss} }`;

    return css;
  }, [config, scopeClass, insetBoxShadow]);

  // ── Overlay data ───────────────────────────────────────────────────────
  const overlayData = useMemo(
    () =>
      config.overlays
        .filter((o) => o.visible)
        .map((overlay, i) => ({
          id: overlay.id,
          twClasses: generateOverlayTw(overlay),
          scopedClass: `${scopeClass}-ov-${i}`,
          css: cssPropertiesToString(generateOverlayStyle(overlay)),
        })),
    [config.overlays, scopeClass]
  );

  const overlayCss = overlayData
    .map((d) => `.${d.scopedClass} { ${d.css} }`)
    .join(' ');

  // ── Text effect data ───────────────────────────────────────────────────
  const textSpanStyle = useMemo(
    () => generateTextSpanStyles(config),
    [config]
  );
  const textShimmerStyle = useMemo(
    () => generateTextShimmerStyles(config),
    [config]
  );
  const shimmerKeyframes = useMemo(
    () => generateTextShimmerKeyframes(config.text.shimmer),
    [config.text.shimmer]
  );

  const textSpanTw = useMemo(
    () => (textSpanStyle ? cssPropsToTw(textSpanStyle) : ''),
    [textSpanStyle]
  );
  const textShimmerTw = useMemo(
    () => (textShimmerStyle ? cssPropsToTw(textShimmerStyle) : ''),
    [textShimmerStyle]
  );

  const textEffectCss = useMemo(() => {
    let css = '';
    if (textSpanStyle) {
      css += `.${scopeClass}-text { ${cssPropertiesToString(textSpanStyle)} }`;
    }
    if (textShimmerStyle) {
      css += ` .${scopeClass}-shimmer { ${cssPropertiesToString(textShimmerStyle)} }`;
    }
    return css;
  }, [textSpanStyle, textShimmerStyle, scopeClass]);

  // ── Combined CSS ───────────────────────────────────────────────────────
  const fullCss = [scopedCss, overlayCss, textEffectCss, shimmerKeyframes]
    .filter(Boolean)
    .join(' ');

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
        <style>{fullCss}</style>

        <button className={`${scopeClass} ${buttonTwClasses}`}>
          {textSpanStyle ? (
            <span className="relative">
              <span className={`${scopeClass}-text ${textSpanTw}`}>
                {config.text.content}
              </span>
              {textShimmerStyle && (
                <span
                  className={`${scopeClass}-shimmer ${textShimmerTw}`}
                  aria-hidden="true"
                >
                  {config.text.content}
                </span>
              )}
            </span>
          ) : (
            config.text.content
          )}
          {overlayData.map((d) => (
            <div key={d.id} className={`${d.scopedClass} ${d.twClasses}`} />
          ))}
          <div className={`${scopeClass}-inset ${insetOverlayTwClasses}`} />
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
