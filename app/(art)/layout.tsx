import NavBar from '@/components/ui/NavBar';

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-10 w-full self-center items-center pb-10">
      <NavBar />
      {children}
    </div>
  );
}
