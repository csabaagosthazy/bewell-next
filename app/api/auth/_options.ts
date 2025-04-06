import { SessionStrategy, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google'

interface CustomSession extends Session {
  accessToken?: string;
}


export const authOptions = {
  theme: { logo: '/favicon.ico' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/drive',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    })
  ],
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      account?: {
        access_token?: string;
      };
    }): Promise<JWT> {
      if (account?.access_token) {
        token.accessToken = account.access_token; // Add access token to JWT
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession
      token: JWT;
    }): Promise<CustomSession> {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string; // Expose access token in the session
      }
      return session;
    },
  },
  session: { strategy: <SessionStrategy>'jwt' }
}
