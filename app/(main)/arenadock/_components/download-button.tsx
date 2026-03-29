'use client';

import { useEffect, useState } from 'react';

const UPDATE_JSON_URL =
  'https://polooner.github.io/are.na-macOS-dock/update.json';
const GITHUB_RELEASES_URL =
  'https://github.com/polooner/are.na-macOS-dock/releases';

function buildDownloadUrl(version: string) {
  return `${GITHUB_RELEASES_URL}/download/v${version}/Are.na.Dock_${version}_aarch64.dmg`;
}

export function DownloadButton() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    fetch(UPDATE_JSON_URL)
      .then((r) => r.json())
      .then((data) => setVersion(data.version))
      .catch(() => {});
  }, []);

  const href = version
    ? buildDownloadUrl(version)
    : `${GITHUB_RELEASES_URL}/latest`;

  const label = version
    ? `Download for macOS v${version}`
    : 'Download for macOS';

  return (
    <a
      href={href}
      className="self-center inline-block px-7 py-2.5 bg-black text-white rounded-md text-sm font-medium no-underline transition-[opacity,transform] duration-150 hover:opacity-80 active:scale-95"
    >
      {label}
    </a>
  );
}
