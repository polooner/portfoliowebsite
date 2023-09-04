import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

// TODO: infer zod form values
// TODO: move types to types.ts when done
interface PostFormProps {
  title: string;
  content: string;
  table: string;
  projectUrl?: string;
}

interface DeletePostProps {
  table: string;
  postId: string;
}

export async function POST(req: Request, res) {
  const body: PostFormProps = await req.json();

  // Check if there is a session
  const session = await getServerSession(authOptions);
  console.log(body.table);

  if (session?.user) {
    try {
      // Delete from desired table as defined by the body.table from the request
      switch (body.table) {
        case 'project':
          await db.project.create({
            data: {
              title: body.title,
              content: body.content,
              projectUrl: body.projectUrl,
            },
          });
          console.log('received' + JSON.stringify(body));
          break;
        // TODO: personalize blog options
        case 'blog':
          await db.post.create({
            data: {
              title: body.title,
              content: body.content,
            },
          });
          break;
      }

      return new Response(JSON.stringify(body), {
        status: 200,
      });
    } catch (error) {
      // TODO: test what this returns if error defined
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }
  } else {
    // TODO: Test if works by sending a request without being logged in
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
    // TODO: make a switch case statement from 'table' constant
    // TODO: add deleting for other pages
    console.log(body);
    await db.project.delete({
      where: {
        id: postId,
      },
    });
    // Returns 200 if deleted,
    // TODO: make this statement a variable to catch errors or returned affected tables
    const resJson = {
      message: `Deleted project id ${postId}`,
    };
    return new Response(JSON.stringify(resJson), {
      status: 200,
    });
  } else {
    // TODO: Test if works by sending a request without being logged in
    return new Response('Unauthorized', {
      status: 401,
    });
  }
}
