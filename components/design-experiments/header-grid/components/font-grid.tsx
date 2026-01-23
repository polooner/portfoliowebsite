import { ReactNode } from "react";
import { FontConfig, FONTS, DISPLAY_TEXT } from "../config";

interface FontGridProps {
  fonts?: FontConfig[];
  text?: string;
  renderItem?: (font: FontConfig, text: string) => ReactNode;
}

function getGridCellClassName(index: number, total: number): string {
  const isLastRow = index >= total - 2;
  const isLeftColumn = index % 2 === 0;
  const isLastItem = index === total - 1;

  const classes = ["p-4", "flex", "items-center", "justify-center"];

  if (!isLastItem) {
    if (isLastRow) {
      if (isLeftColumn) {
        classes.push("border-b xl:border-b-0 xl:border-r");
      }
    } else {
      if (isLeftColumn) {
        classes.push("border-b xl:border-r xl:border-b");
      } else {
        classes.push("border-b xl:border-b");
      }
    }
  }

  return classes.join(" ");
}

export function FontGrid({
  fonts = FONTS,
  text = DISPLAY_TEXT,
  renderItem,
}: FontGridProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 border select-none">
      {fonts.map((font, index) => (
        <div
          key={font.name}
          className={getGridCellClassName(index, fonts.length)}
        >
          {renderItem ? (
            renderItem(font, text)
          ) : (
            <h1 className={font.className}>{text}</h1>
          )}
        </div>
      ))}
    </div>
  );
}
