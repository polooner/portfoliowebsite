import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { string } from 'zod';

const items = [
  {
    href: 'https://www.linkedin.com/in/filip-wojda/',
    name: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/filip_w000',
    name: 'X',
  },
  {
    href: 'https://github.com/polooner',
    name: 'GitHub',
  },
];

export default function PopoverSocials() {
  return (
    <Popover>
      <PopoverTrigger className='mt-0' asChild>
        <Button variant='ghost' className='rounded-xl'>
          <MoreVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} className='w-40 bg-black rounded-xl'>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            {items.map((items) => {
              return (
                <Link
                  className='p-2 text-white rounded-xl hover:bg-neutral-700'
                  key={items.name}
                  href={items.href}
                >
                  {items.name}
                </Link>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
