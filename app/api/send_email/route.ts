import mailchimpTx from '@mailchimp/mailchimp_transactional';
import Cryptr from 'cryptr';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY as string);
  const body = await req.json();
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const decryptedKey = cryptr.decrypt(body.key);
  if (api_key == decryptedKey) {
    const message: any = {
      from_email: body.email,
      subject: `[PERSONAL WEBSITE] inquiry from ${body.email}`,
      text: body.text,
      to: [
        {
          email: 'wojdafilipdev@gmail.com',
          type: 'to',
        },
      ],
    };

    const mc = mailchimpTx(process.env.SMTP_PASSWORD as string);
    await mc.messages
      .send({
        message,
      })
      .then((res) => {
        return NextResponse.json({ status: 200 });
      })
      .catch((err) => {
        return NextResponse.json({ status: 500 });
      });
  }

  return NextResponse.json({ status: 401 });
}
