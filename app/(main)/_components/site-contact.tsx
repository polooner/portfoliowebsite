import Link from 'next/link';

const CONTACT_LINKS = [
  { label: 'email', href: 'mailto:wojdafilipdev@gmail.com' },
];

export function SiteContact() {
  return (
    <div className="mt-auto flex flex-col text-neutral-500">
      {CONTACT_LINKS.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          target="_blank"
          className="w-fit text-2xl leading-tight hover:text-black hover:underline hover:decoration-dotted hover:decoration-1 hover:underline-offset-4"
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
