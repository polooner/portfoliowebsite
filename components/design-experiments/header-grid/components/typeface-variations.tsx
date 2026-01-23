import { SectionHeader } from "./section-header";
import { FontGrid } from "./font-grid";

export function TypefaceVariations() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader title="TYPEFACE/FONT STYLE VARIATIONS" />
      <FontGrid />
    </section>
  );
}
