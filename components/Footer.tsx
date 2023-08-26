'use client';

import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer animate={{}} className='flex flex-row space-x-2'>
      <a target='_blank' href='https://twitter.com/filip_w000'>
        <TwitterLogoIcon width={25} height={25} />
      </a>
      <a target='_blank' href='https://www.linkedin.com/in/filip-wojda/'>
        <LinkedInLogoIcon width={25} height={25} />
      </a>
      <a target='_blank' href='https://github.com/polooner'>
        <GitHubLogoIcon width={25} height={25} />
      </a>
    </motion.footer>
  );
};

export default Footer;
