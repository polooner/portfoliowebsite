import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

export const dynamic = 'force-dynamic';

//TODO: change to infer zod form values
interface PostFormProps {
  title: string;
  content: string;
}

interface DeletePostProps {
  table: string;
  postId: string;
}

export async function POST(req: Request, res) {
  const body: PostFormProps = await req.json();
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  if (session?.user) {
    await db.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return new Response(JSON.stringify(body), {
      status: 200,
    });
  } else {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
}

export async function DELETE(req: Request) {
  const body: DeletePostProps = await req.json();
  const { table, postId } = body;
  console.log(table, postId);

  const session = await getServerSession(authOptions);

  if (session?.user) {
    await db.$executeRaw`
      DELETE FROM ${table} WHERE id = ${postId};
      `;
    return new Response(`Deleted post ${postId}`, {
      status: 200,
    });
  } else {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
}
