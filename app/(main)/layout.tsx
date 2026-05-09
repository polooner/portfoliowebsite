import type { Metadata } from "next";
import { MainShell } from "./_components/main-shell";

export const metadata: Metadata = {
  title: "Filip Wojda",
  description: "a creator",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainShell>{children}</MainShell>;
}
