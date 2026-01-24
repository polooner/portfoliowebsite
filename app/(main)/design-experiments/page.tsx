'use client';

import { BlurRevealText } from './components/blur-reveal-text';

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-8">
      <BlurRevealText
        text="Hello world! This is a streaming text animation with a gradient blur reveal effect. Characters smoothly transition from blurred to sharp as the cursor advances."
        streamingSpeed={35}
        blurWindowSize={6}
        maxBlur={8}
      />
    </div>
  );
}
