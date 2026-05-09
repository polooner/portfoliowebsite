import { Clock } from './clock';

export function SiteHeader() {
  return (
    <div className="flex flex-row items-start justify-between gap-4 max-w-[360px]">
      <h1 className="text-2xl leading-tight">
        Filip Wojda
        <span className="block text-neutral-500">mutlficated creative</span>
      </h1>
      <div className="font-mono text-neutral-600 shrink-0">
        <Clock />
      </div>
    </div>
  );
}
