import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

type Props = {};

function Footer({}: Props) {
  const date = new Date().getFullYear();

  return (
    <footer className='font-light text-xs pt-20 tracking-tight'>
      <div className='flex justify-center space-x-20 py-2 md:py-6'>
        <div className='flex flex-row items-center'>
          <FaGithub />
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/polooner'
            className='text-gray-400'
          >
            GitHub
          </a>
        </div>

        <div className='flex flex-row items-center'>
          <FaLinkedin />
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.linkedin.com/in/filip-wojda-932b88201/'
            className='text-gray-400'
          >
            LinkedIn
          </a>
        </div>

        <div className='flex flex-row items-center'>
          <FaTwitter />
          <a
            href='https://twitter.com/filip_w000'
            target='_blank'
            rel='noreferrer'
            className='text-gray-400'
          >
            Twitter
          </a>
        </div>
      </div>
      <p className='py-2 text-gray-400 cursor-default text-center'>
        Copyright &copy; {date} Filip Wojda
      </p>
    </footer>
  );
}

export default Footer;
