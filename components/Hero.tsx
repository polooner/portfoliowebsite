import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

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
    <article className='h-screen flex flex-col space-y-8 self-center items-center justify-center text-center overflow-hidden'>
      <h1 className='flex py-16 md:text-[72px] text-4xl self-center bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent tracking-tight font-black'>
        <p>{text}</p>
        <Cursor />
      </h1>
      <h2 className='text-gray-500 font-light'>
        Software Enginner, Computer Science Student
      </h2>
    </article>
  );
}

export default Hero;
