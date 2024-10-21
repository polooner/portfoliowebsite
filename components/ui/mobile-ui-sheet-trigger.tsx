import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { items } from "@/app/(ui)/ui/layout";
import { useState } from "react";

const MobileUISheetTrigger = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (!pathname.startsWith("/ui")) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="focus:ring-0 focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="py-20 h-[calc(100vh-1rem)] mt-[0.5rem] rounded-r-xl"
      >
        <ScrollArea>
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="w-full pb-20">
              {items.map((item) => (
                <SheetClose asChild>
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center p-2 gap-2 ${
                      pathname === item.href
                        ? "bg-stone-200 rounded-md "
                        : "hover:underline"
                    }`}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
              <div className="pb-4"></div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileUISheetTrigger;
