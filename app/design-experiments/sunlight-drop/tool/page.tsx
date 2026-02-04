import LeftPanel from './_components/left-panel';
import RightPanel from './_components/right-panel';
import ToolCanvas from './_components/tool-canvas';

export default function SunlightDropToolPage() {
  return (
    <div className="fixed inset-0 bg-neutral-900">
      {/* Canvas area (fills entire background) */}
      <ToolCanvas />

      {/* Floating panels */}
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
