import React from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import Spline from '@splinetool/react-spline';

type Props = {};

function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: [
      'Hi, I am Filip',
      'I <Deploy />',
      'Hi, I am Filip',
      'I <Design />',
      'Hi, I am Filip',
      'I code.',
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <article className='h-screen relative flex flex-col space-y-8 self-center items-center bg-transparent justify-center text-center overflow-hidden'>
      <h1 className='flex absolute  top-28 p-20 md:p-32 md:text-[72px] text-4xl self-center bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent tracking-tight font-black'>
        <p>{text}</p>
      </h1>
      <Spline scene='https://prod.spline.design/gS49rkuI3FyEHjuj/scene.splinecode' />
      <h2 className='absolute bottom-34 md:bottom-42 pb-32 md:pb-52 text-gray-500 font-light'>
        Software Enginner, Computer Science Student
      </h2>
    </article>
  );
}

export default Hero;
