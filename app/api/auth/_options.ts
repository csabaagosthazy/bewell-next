import { SessionStrategy } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


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
  session: { strategy: <SessionStrategy> 'jwt' }
}
