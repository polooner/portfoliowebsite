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
        <p>founder, creative</p>
        <br />
        <br />
        <div className="flex flex-row gap-1">
          building the world's first video editing copilot
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://www.ekran.ai"
          >
            ekran.ai
          </Link>
        </div>
        launched from{" "}
        <Link
          className="font-bold hover:underline"
          target="_blank"
          href="https://www.f.inc"
        >
          f.inc
        </Link>{" "}
        [ship it] in feb - mar 2025
        <br />
        <br />
        <div className="flex flex-row gap-1">
          previously built an ai shorts generator
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://www.makeklips.ai"
          >
            makeklips.ai
          </Link>
        </div>
        <div>
          <br />
          previously founding engineer & employee #6 @
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://www.julius.ai"
          >
            julius.ai
          </Link>
        </div>
        <br />
        <div className="flex flex-row gap-1 max-w-sm">
          previously previously made art, clothes, a little bit of acting in a
          past life in new york
        </div>
        <br />
        <p>i am based out of sf, visit nyc every few months</p>
        <br />
        <div>
          i like philosophy <br /> and ai <br /> and ui.
        </div>
      </div>
    </section>
  );
}
