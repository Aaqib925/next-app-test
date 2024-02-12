/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultSession, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { Post } from '@/utils/apiService';


export interface UserSessionType extends DefaultSession {
  user?: {
    id?: string | null;
    token?: string | null;
    email?: string | null;
  };
}

export interface UserTokenType {
  data?: {
    user?: {
      token?: string | null;
      twilioToken: string | null;
    };
  };
}

export interface UserDataSessionType {
  data?: {
    user?: {
      id?: string | null;
      email?: string | null;
      token?: string | null;
      twilioToken: string | null;
    };
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
        isNewUser: {},
      },
      async authorize(credentials) {
        let user = null;
        if (credentials?.isNewUser) {
          try {
            const res = await Post({
              url: '/api/v1/login',
              body: {
                email: credentials.email,
                password: credentials.password
              },
              isAuthorized: false,
            });
            user = {
              token: res.access_token,
              email: credentials?.email
            }
          }
          catch (error: any) {
            throw new Error(error?.message);
          }
        }
        return {
          token: user?.token,
          email: credentials?.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === 'update' && session) {
        return { ...token, ...session?.user };
      }

      return { ...token, ...user };
    },
    async session({
      session,
      token,
    }: {
      session: UserSessionType;
      token: JWT;
    }) {
      if (session?.user && token) {
        session.user.id = token as any;
        session.user.token = token.token as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/signin', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
  },
};
