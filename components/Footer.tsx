'use client';

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

import { motion } from 'framer-motion';
import { Icons } from './ui/icons';

const Footer = () => {
  return (
    <motion.footer
      animate={{}}
      className='fixed hidden sm:flex flex-row space-x-2 left-4 bottom-4'
    >
      <a
        target='_blank'
        href='https://twitter.com/filip_w000'
        className='opacity-50 hover:opacity-100'
      >
        <TwitterLogoIcon width={25} height={25} />
      </a>
      <a
        target='_blank'
        href='https://www.linkedin.com/in/filip-wojda/'
        className='opacity-50 hover:opacity-100'
      >
        <LinkedInLogoIcon width={25} height={25} />
      </a>
      <a
        target='_blank'
        href='https://github.com/polooner'
        className='opacity-50 hover:opacity-100'
      >
        <GitHubLogoIcon width={25} height={25} />
      </a>
      <a
        target='_blank'
        className='opacity-50 hover:opacity-100'
        href='https://www.tiktok.com/@wojda_labs'
      >
        <Icons.tikTok width={25} height={25} />
      </a>
    </motion.footer>
  );
};

export default Footer;
