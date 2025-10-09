import { Instruction } from '@/types';
import { Disc, Menu } from 'lucide-react';
import Link from 'next/link';

export const CrossBordersNavBar = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[30dvh] relative">
      <div className=" flex justify-between group/row isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)] relative">
        <div className="absolute inset-y-0 left-1/2 -z-10 w-full -translate-x-1/2">
          <div className="absolute inset-x-0 top-0 border-t border-black/5"></div>
          <div className="absolute inset-x-0 top-2 border-t border-black/5"></div>
          <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/5 group-last/row:block"></div>
          <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/5 group-last/row:block"></div>
        </div>
        <div className="relative flex gap-6">
          <div className="py-3 group/item relative">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2" />
            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />
            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Link
              href="#"
              className="px-4 py-3 items-center flex justify-center text-heathered-gray-800"
            >
              Disc Company
              <Disc className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
        <nav className="relative hidden lg:flex">
          <div className="relative flex group/item">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />

            <Link
              className="flex items-center px-4 py-3 text-base font-medium hover:text-heathered-gray-800 text-heathered-gray-800/50"
              href="/pricing"
            >
              Pricing
            </Link>
          </div>
          <div className="relative flex group/item">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Cross className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2" />

            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />

            <Link
              className="flex items-center px-4 py-3 text-base font-medium hover:text-heathered-gray-800 text-heathered-gray-800/50"
              href="#"
            >
              Tools
            </Link>
          </div>
          <div className="relative flex group/item">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Cross className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2" />

            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />

            <Link
              className="flex items-center px-4 py-3 text-base font-medium hover:text-heathered-gray-800 text-heathered-gray-800/50"
              href="/blog"
            >
              Blog
            </Link>
          </div>
          <div className="relative flex group/item">
            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />
            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />
            <div className="flex items-center px-4 py-3 text-base font-medium rounded-xl p-1 ">
              <Link
                className="flex items-center px-4 py-1 text-base font-medium dark:text-heathered-gray-800 rounded-2xl text-white p-1 bg-heathered-gray-800 dark:bg-white hover:bg-heathered-gray-900 transition-colors duration-150"
                href="#"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
        <div className="lg:hidden flex items-center justify-center p-2">
          <Menu className="size-4" />
        </div>
      </div>
    </div>
  );
};

const Cross = ({
  className,
  ...svgProps
}: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg viewBox="0 0 15 15" aria-hidden="true" className={className} {...svgProps}>
      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
    </svg>
  );
};

export const CrossBordersNavBarCode = `import { Disc, Menu } from "lucide-react";

export const CrossEndedBoxNavigationBar = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[30dvh] relative">
      <div className=" flex justify-between group/row isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)] relative">
        <div className="absolute inset-y-0 left-1/2 -z-10 w-full -translate-x-1/2">
          <div className="absolute inset-x-0 top-0 border-t border-black/5"></div>
          <div className="absolute inset-x-0 top-2 border-t border-black/5"></div>
          <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/5 group-last/row:block"></div>
          <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/5 group-last/row:block"></div>
        </div>
        <div className="relative flex gap-6">
          <div className="py-3 group/item relative">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2" />
            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />
            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Link
              href="#"
              className="px-4 py-3 items-center flex justify-center text-heathered-gray-800"
            >
              Disc Company
              <Disc className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
        <nav className="relative hidden lg:flex">
          <div className="relative flex group/item">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />

            <Link
              className="flex items-center px-4 py-3 text-base font-medium hover:text-heathered-gray-800 text-heathered-gray-800/50"
              href="/pricing"
            >
              Pricing
            </Link>
          </div>
          <div className="relative flex group/item">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Cross className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2" />

            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />

            <Link
              className="flex items-center px-4 py-3 text-base font-medium hover:text-heathered-gray-800 text-heathered-gray-800/50"
              href="#"
            >
              Tools
            </Link>
          </div>
          <div className="relative flex group/item">
            <Cross className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2" />

            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />

            <Cross className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2" />

            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />

            <Link
              className="flex items-center px-4 py-3 text-base font-medium hover:text-heathered-gray-800 text-heathered-gray-800/50"
              href="/blog"
            >
              Blog
            </Link>
          </div>
          <div className="relative flex group/item">
            <Cross className="absolute size-[15px] fill-black/10 -top-2 -right-2" />
            <Cross className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2" />
            <div className="flex items-center px-4 py-3 text-base font-medium rounded-xl p-1 ">
              <Link
                className="flex items-center px-4 py-1 text-base font-medium dark:text-heathered-gray-800 rounded-2xl text-white p-1 bg-heathered-gray-800 dark:bg-white hover:bg-heathered-gray-900 transition-colors duration-150"
                href="#"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
        <div className="lg:hidden flex items-center justify-center p-2">
          <Menu className="size-4" />
        </div>
      </div>
    </div>
  );
};`;

const CrossCode = `const Cross = ({
  className,
  ...svgProps
}: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg
      viewBox="0 0 15 15"
      aria-hidden="true"
      className={className}
      {...svgProps}
    >
      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
    </svg>
  );
};`;

export const CrossBordersNavBarInstructions: Instruction[] = [
  {
    code: CrossCode,
    description: 'Create this cross SVG first',
    file: 'ui/Cross.tsx',
  },
  {
    code: CrossBordersNavBarCode,
    file: 'ui/CrossNavigationBar.tsx',
    description: 'Copy and paste this',
  },
];
