type Position = 'left' | 'center' | 'right';

const POSITION_PERCENT: Record<Position, number> = {
  left: 0,
  center: 50,
  right: 100,
};

const LIFELINE_POSITIONS: Position[] = ['left', 'center', 'right'];

type SequenceStepProps =
  | { from: Position; to: Position; label: string; dashed?: boolean; spacer?: never }
  | { spacer: true; from?: never; to?: never; label?: never; dashed?: never };

/**
 * A single row in a sequence diagram — either an arrow between columns or a spacer.
 * Both variants render vertical lifelines at each column position.
 */
export function SequenceStep(props: SequenceStepProps) {
  const lifelines = LIFELINE_POSITIONS.map((pos) => (
    <div
      key={pos}
      className="absolute top-0 h-full border-l border-neutral-200"
      style={{ left: `${POSITION_PERCENT[pos]}%` }}
    />
  ));

  if (props.spacer) {
    return <div className="relative h-3">{lifelines}</div>;
  }

  const { from, to, label, dashed } = props;
  const fromPct = POSITION_PERCENT[from];
  const toPct = POSITION_PERCENT[to];
  const leftPct = Math.min(fromPct, toPct);
  const widthPct = Math.abs(toPct - fromPct);
  const pointsRight = toPct > fromPct;

  return (
    <div className="relative h-6">
      {lifelines}

      <div
        className="absolute top-1/2 flex items-center"
        style={{
          left: `${leftPct}%`,
          width: `${widthPct}%`,
        }}
      >
        <div
          className={`w-full border-t ${dashed ? 'border-dashed' : ''} border-neutral-400`}
        />
        <span
          className={`absolute top-1/2 -translate-y-full pb-0.5 text-[10px] text-neutral-600 whitespace-nowrap ${
            pointsRight ? 'left-1' : 'right-1'
          }`}
        >
          {label}
        </span>
        <span
          className={`absolute ${pointsRight ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 text-neutral-400 text-[8px] leading-none`}
        >
          {pointsRight ? '\u25B6' : '\u25C0'}
        </span>
      </div>
    </div>
  );
}
