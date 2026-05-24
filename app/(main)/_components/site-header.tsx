import { Clock } from './clock';

export function SiteHeader() {
  return (
    <div className="flex flex-col items-start gap-1 max-w-[360px]">
      <h1 className="text-2xl leading-tight">
        Filip Wojda
      </h1>
      <div className="font-mono text-neutral-600">
        <Clock />
      </div>
    </div>
  );
}
