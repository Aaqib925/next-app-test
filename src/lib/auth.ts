/* eslint-disable @typescript-eslint/no-explicit-any */
import { Get, Post } from '@/utils/apiService';
import { DefaultSession, NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';


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
    };
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
        firstName: {},
        lastName: {},
        isNewUser: {},
        formData: {}
      },
      async authorize(credentials) {
        // let user = null;
        let doesUserExist;
        console.log("ADSASD", credentials?.formData)

        if (credentials?.isNewUser) {
          try {
            const res = await Post({
              url: '/api/v1/register',
              body: credentials?.formData,
              isAuthorized: false,
              abortSignal: null,
              isFormData: true,
            });
            if (res?.message) {
              console.log("SDASADSADSDADSA", res?.message)
            }
          }
          catch (error: any) {
            console.log("ADSDSA", error)
          }
        }
        else {
          doesUserExist = true;
        }

        // if (doesUserExist) {
        //   try {
        //     const res = await Post({
        //       url: '/auth/login',
        //       body: {
        //         email: credentials?.email,
        //         password: credentials?.password,
        //       },
        //     });
        //     if (res?.message) {
        //       throw new Error(res?.message);
        //     }

        //     user = { token: res?.token, email: credentials?.email };
        //   } catch (error: any) {
        //     throw new Error(error?.message);
        //   }
        // } else {
        //   if (!credentials?.firstName || !credentials?.lastName) {
        //     user = { token: '', email: credentials?.email };
        //     return user;
        //   }

        //   try {
        //     const res = await Post({
        //       url: '/auth/signup',
        //       body: {
        //         firstName: credentials?.firstName,
        //         lastName: credentials?.lastName,
        //         email: credentials?.email,
        //         password: credentials?.password,
        //       },
        //     });
        //     if (res?.message) {
        //       throw new Error(res?.message);
        //     }

        //     user = {
        //       token: res?.token,
        //     };
        //   } catch (error: any) {
        //     throw new Error(error?.message);
        //   }
        // }

        // return { token: user?.token, email: credentials?.email };
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
      session: UserSessionType;
      token: JWT;
    }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
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
