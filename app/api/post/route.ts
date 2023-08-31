import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

//TODO: change to infer zod form values
interface PostFormValues {
  title: string;
  content: string;
}

export async function POST(req: Request, res) {
  const body: PostFormValues = await req.json();
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
    return new Response('Empty body', {
      status: 500,
    });
  }
}
