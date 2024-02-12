/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultSession, NextAuthOptions, Session, User } from 'next-auth';
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
        let token;
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
            console.log("RESPONSE MESSAGE ==> ", res)
            token = res?.data?.access_token;
          }
          catch (error: any) {
            console.log("ERROR MESSAGE ==> ", error)
          }
        }

        return { token: token , email: credentials?.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      return { ...user, ...token };
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      if (session?.user && token) {
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
