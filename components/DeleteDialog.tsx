'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Icons } from './ui/icons';
import { db } from '@/lib/db';
import { useRouter } from 'next/navigation';

interface DeleteDialogProps {
  postId: string;
  table: string;
}

export function DeleteDialog(props: DeleteDialogProps) {
  // TODO: make a hooks file
  const router = useRouter();
  const { table, postId } = props;
  const handleDelete = async () => {
    fetch('/api/post', {
      method: 'DELETE',
      body: JSON.stringify(props),
    })
      .then(async (res) => {
        const json = await res.json();
        alert(JSON.stringify(json));
        router.refresh();
      })
      .catch((err) => {
        alert(err);
      });
  };
  console.log(table, postId);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icons.trash className='z-20' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            post from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
