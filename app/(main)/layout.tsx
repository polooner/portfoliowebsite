import NavBar from "@/components/ui/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filip Wojda",
  description: "a creator",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex text-start space-y-10 flex-col justify-center items-center sans w-full">
      <NavBar />

      {children}
    </div>
  );
}
