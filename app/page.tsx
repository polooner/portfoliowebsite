import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Filip Wojda",
  description: "I like to build.",
};

export default function Home() {
  return (
    <section className="flex flex-col gap-y-10 w-full py-20 self-center items-center">
      <div className=" text-start">
        <strong>Filip Wojda</strong>
        <br />

        <p>ai engineer</p>

        <br />
        <br />
        <div>
          currently a founding engineer at{" "}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://www.julius.ai"
          >
            julius.ai
          </Link>
        </div>
        <div>
          <br />
          previously built{" "}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://www.makeklips.ai"
          >
            makeklips.ai
          </Link>
        </div>
        <br />
        <p>i am based out of sf</p>
        <br />
        <div>
          i like philosophy <br /> and ai <br /> and ui.
        </div>
      </div>
    </section>
  );
}
