import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DemoVideo } from './_components/demo-video';
import { DownloadButton } from './_components/download-button';
import { SequenceStep } from './_components/sequence-step';

export const metadata: Metadata = {
  title: 'Are.na Dock | Filip Wojda',
  description:
    'A macOS menu bar app for quickly saving links, images, and text to your Are.na channels.',
};

export default function ArenaDockPage() {
  return (
    <section className="flex flex-col gap-8 w-full max-w-2xl px-4 py-12 self-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 self-center">
          <div
            className="rounded-2xl overflow-hidden shrink-0"
            style={{ viewTransitionName: 'arenadock-image' }}
          >
            <Image
              src="/arenadock1.png"
              alt="ArenaDock icon"
              width={280}
              height={280}
              className="w-full h-auto"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/arenadock2.png"
              alt="ArenaDock interface"
              width={280}
              height={280}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <Link
              className="font-bold text-6xl hover:underline"
              target="_blank"
              href="https://github.com/polooner/are.na-macOS-dock"
            >
              Are.na Dock
            </Link>
            <div className="flex flex-col text-right">
              <span className="font-bold">2026</span>
              <i className="font-thin text-xs">engineering, design</i>
            </div>
          </div>
          <hr className="border-neutral-200" />
        </div>

        <p>
          A macOS menu bar app for quickly saving things to{' '}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://www.are.na"
          >
            Are.na
          </Link>
          . Drop a link, paste text, or drag a file &mdash; ArenaDock sends it
          straight to your Are.na channels without ever opening a browser.
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <DownloadButton />
      </div>

      <DemoVideo />

      <div className="flex flex-col gap-10 pt-24 text-neutral-700">
        <span className="font-medium font-mono text-xl">Features</span>
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>
            <span className="font-bold">Menu bar app</span> &mdash; lives in
            your tray, toggled with{' '}
            <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
              Ctrl+Option+A
            </code>{' '}
            or a click
          </li>
          <li>
            <span className="font-bold">Drag &amp; drop file uploads</span>{' '}
            &mdash; images, PDFs, videos, etc.
          </li>
          <li>
            <span className="font-bold">Link and text blocks</span> &mdash;
            paste a URL or type text to create blocks
          </li>
          <li>
            <span className="font-bold">Channel picker</span> &mdash; search
            your channels or browse recents, connect to multiple at once
          </li>
          <li>
            <span className="font-bold">OAuth login</span> &mdash;
            authenticates via Are.na&apos;s OAuth flow in an embedded webview
          </li>
        </ul>

        <span className="font-medium font-mono text-xl">
          How file uploads work
        </span>
        <p>
          Are.na doesn&apos;t expose a direct file-upload API endpoint. Instead,
          uploads go through a 3-step presigned S3 flow. The catch: Are.na&apos;s
          S3 bucket CORS policy only allows{' '}
          <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
            *.are.na
          </code>{' '}
          origins, but a Tauri webview runs on{' '}
          <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
            tauri://localhost
          </code>
          . The fix: route the S3 PUT through Rust, bypassing the browser&apos;s
          CORS enforcement entirely.
        </p>
        <div className="flex flex-col gap-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-4">
          <div className="flex flex-row justify-between text-neutral-500 font-medium pb-2 border-b border-neutral-200">
            <span>Browser (JS)</span>
            <span>Rust (Tauri)</span>
            <span>Are.na / S3</span>
          </div>
          <SequenceStep from="left" to="center" label="POST /uploads/presign" />
          <SequenceStep from="center" to="left" label="{ upload_url, key }" dashed />
          <SequenceStep spacer />
          <SequenceStep from="left" to="center" label='invoke("upload_to_s3")' />
          <SequenceStep from="center" to="right" label="PUT upload_url" />
          <SequenceStep from="right" to="center" label="200 OK" dashed />
          <SequenceStep from="center" to="left" label="Ok(())" dashed />
          <SequenceStep spacer />
          <SequenceStep from="left" to="center" label="POST /blocks { s3_url, channel_ids }" />
          <SequenceStep from="center" to="left" label="block created" dashed />
        </div>

        <span className="font-medium font-mono text-xl">Tech stack</span>
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>
            <span className="font-bold">Tauri 2</span> &mdash; Rust backend,
            native webview frontend
          </li>
          <li>
            <span className="font-bold">React + TypeScript</span> &mdash; UI
          </li>
          <li>
            <span className="font-bold">Vite</span> &mdash; bundler
          </li>
          <li>
            <span className="font-bold">reqwest</span> &mdash; HTTP client
            (Rust side, for S3 uploads and OAuth token exchange)
          </li>
        </ul>

        <span className="font-medium font-mono text-xl">Releasing</span>
        <p>
          Releases are fully automated via GitHub Actions. Tagging a version
          triggers a build, sign, and notarize pipeline that creates a GitHub
          Release with the{' '}
          <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
            .dmg
          </code>{' '}
          and updates{' '}
          <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
            update.json
          </code>{' '}
          so existing users get auto-updated.
        </p>
      </div>
    </section>
  );
}
