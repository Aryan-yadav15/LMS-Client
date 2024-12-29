import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import User from '@/models/User';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          return true;
        }
        return false;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.role = user.role || 'user';
      }
      if (account && user === undefined) {
        try {
          await clientPromise;
          const existingUser = await User.findOne({ email: token.email });
          if (!existingUser) {
            const newUser = await User.create({
              name: token.name,
              email: token.email,
              role: 'user',
              profileImage: token.picture,
            });
            token.role = newUser.role;
          } else {
            token.role = existingUser.role;
          }
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role || 'user';
        session.accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
}; 