'use client';

import { useEffect, useState } from 'react';

const TICK_INTERVAL_MS = 1000;
const TIME_ZONE = 'America/New_York';
const LOCATION_LABEL = 'New York';

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-GB', {
    hour12: false,
    timeZone: TIME_ZONE,
  });
}

export function Clock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, TICK_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="flex flex-row items-baseline gap-2" suppressHydrationWarning>
      <span>{LOCATION_LABEL}</span>
      <span>{time}</span>
    </span>
  );
}
