export default function RightPanel() {
  return (
    <aside className="fixed right-4 top-4 bottom-4 z-50 flex w-72 flex-col rounded-2xl border border-white/10 bg-neutral-800/90 backdrop-blur-xl">
      <div className="border-b border-white/10 p-4">
        <h2 className="text-sm font-medium text-neutral-200">Settings</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-neutral-500">Animation settings coming soon...</p>
      </div>
    </aside>
  );
}
