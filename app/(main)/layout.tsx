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
    <div className="flex text-start flex-col justify-center items-center sans w-full pl-48">
      <NavBar />
      {children}
    </div>
  );
}
