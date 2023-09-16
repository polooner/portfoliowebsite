'use client';

import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      animate={{}}
      className='fixed flex flex-row space-x-2 bg-white left-4 bottom-4'
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
    </motion.footer>
  );
};

export default Footer;
