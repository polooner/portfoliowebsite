"use client";

import Link from "next/link";
import {
  TypefaceVariations,
  InkBleedPlayground,
  BlurInPlayground,
} from "./components";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col gap-16 p-8">
      <div className="flex flex-col gap-1 py-30">
        <h2 className="font-greed text-[120px] font-medium leading-30 ">
          The steps we took to design our header.
        </h2>
        <h3 className="font-greed text-sm font-normal pt-10">
          <b>The goal:</b>&nbsp; will this look chic when the form of an aged
          New York City street poster?
        </h3>
        <span className="font-greed text-sm font-normal ">
          <b>Featuring:</b>&nbsp; the experiments that guided our hunt for the
          right typefaces.
        </span>
        <span className="font-greed text-sm font-normal ">
          <b>Typeface Credits:</b>&nbsp;{" "}
          <Link
            href="https://displaay.net/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            displaay.net
          </Link>
        </span>
      </div>

      <div className="flex flex-col gap-60">
        <TypefaceVariations />
        <InkBleedPlayground />
        <BlurInPlayground />
      </div>
    </div>
  );
}
