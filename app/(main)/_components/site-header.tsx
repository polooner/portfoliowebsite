import { Clock } from './clock';

export function SiteHeader() {
  return (
    <div className="flex flex-col items-start gap-1 max-w-[360px]">
      <h1 className="text-2xl leading-tight text-red-600">
        Filip Wojda
      </h1>
      <div className="font-mono text-red-300">
        <Clock />
      </div>
    </div>
  );
}
