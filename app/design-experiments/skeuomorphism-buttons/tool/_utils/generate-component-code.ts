import {
  BackgroundMode,
  BorderMode,
  ShadowType,
  type ButtonConfig,
} from '../_types/button-config';
import { oklchToCssAlpha } from './color-utils';
import {
  generateBoxShadow,
  generateBackground,
  generateTextShadow,
  generateHoverCss,
  generateActiveCss,
  generateOverlayStyle,
} from './generate-css-styles';

/**
 * Generates a self-contained React component string from a ButtonConfig.
 * The output is a standalone 'use client' component with scoped styles.
 */
export function generateComponentCode(config: ButtonConfig): string {
  const bg = generateBackground(config);
  const boxShadow = generateBoxShadow(config.shadows);
  const textShadow = generateTextShadow(config);
  const borderRadius = `${config.border.topLeftRadius}px ${config.border.topRightRadius}px ${config.border.bottomRightRadius}px ${config.border.bottomLeftRadius}px`;
  const hoverCss = generateHoverCss(config);
  const activeCss = generateActiveCss(config);

  // Build border CSS
  let borderCss = '';
  if (config.border.width > 0) {
    if (config.border.mode === BorderMode.Uniform) {
      borderCss = `border: ${config.border.width}px solid ${oklchToCssAlpha(config.border.uniformColor, config.border.uniformOpacity)};`;
    } else {
      const highlight = oklchToCssAlpha(config.border.bevelHighlightColor, config.border.bevelHighlightOpacity);
      const shadow = oklchToCssAlpha(config.border.bevelShadowColor, config.border.bevelShadowOpacity);
      borderCss = `border-width: ${config.border.width}px; border-style: solid; border-top-color: ${highlight}; border-left-color: ${highlight}; border-bottom-color: ${shadow}; border-right-color: ${shadow};`;
    }
  } else {
    borderCss = 'border: none;';
  }

  // Build overlay JSX
  const overlayJsx = config.overlays
    .filter((o) => o.visible)
    .map((overlay) => {
      const style = generateOverlayStyle(overlay);
      const styleEntries = Object.entries(style)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => {
          const cssProp = k.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${cssProp}: ${typeof v === 'number' ? `${v}px` : v}`;
        })
        .join('; ');
      return `        <div style={{ ${Object.entries(style).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} }} />`;
    })
    .join('\n');

  const hasOverlays = config.overlays.some((o) => o.visible);

  return `'use client';

import { useId } from 'react';

interface SkeuButtonProps {
  children?: React.ReactNode;
}

export function SkeuButton({ children }: SkeuButtonProps) {
  const id = useId();
  const className = \`skeu-btn-\${id.replace(/:/g, '')}\`;

  return (
    <>
      <style>{\`
        .\${className} {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          line-height: 1.2;
          padding: ${config.shape.paddingY}px ${config.shape.paddingX}px;
          ${config.shape.minWidth ? `min-width: ${config.shape.minWidth}px;` : ''}
          background: ${bg};
          box-shadow: ${boxShadow};
          border-radius: ${borderRadius};
          ${borderCss}
          color: ${oklchToCssAlpha(config.text.color, config.text.opacity)};
          font-size: ${config.text.fontSize}px;
          font-weight: ${config.text.fontWeight};
          letter-spacing: ${config.text.letterSpacing}px;
          ${textShadow !== 'none' ? `text-shadow: ${textShadow};` : ''}
          transition: all ${config.hover.transitionDuration}ms ease;
        }
        ${hoverCss ? `.\${className}:hover { ${hoverCss} }` : ''}
        ${activeCss ? `.\${className}:active { ${activeCss} }` : ''}
      \`}</style>
      <button className={className}>
        {children ?? '${config.text.content}'}${hasOverlays ? `\n${overlayJsx}` : ''}
      </button>
    </>
  );
}`;
}
