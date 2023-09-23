import dynamic from 'next/dynamic';

const ContactSection = dynamic(
  () => import('../../components/ContactSection')
);

export default function Page() {
  return <ContactSection />;
}
