import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { db } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async signIn({ user, account, profile, email }) {
      const isAllowedToSignIn = user.email === process.env.MY_EMAIL;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return '/unathorized';
      }
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.error(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};
