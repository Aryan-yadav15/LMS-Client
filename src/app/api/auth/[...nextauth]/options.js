import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const superAdminEmails = [
  'aryanyadav.devop@gmail.com',
  'superadmin2@example.com',
  // Add more superadmin emails here
];

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      // Set the user's role based on the email or previous data in the token
      if (user) {
        // When user signs in for the first time, assign the role
        const role = superAdminEmails.includes(user.email.toLowerCase()) ? 'superadmin' : 'user';
        token.role = role;  // Add the role to the token
      } else {
        // If the user is already signed in, check the token for the role
        token.role = token.role || 'user';
      }

      // Handle creating a new user if they don't exist
      if (account && user) {
        try {
          await clientPromise;
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Assign role based on email
            const role = superAdminEmails.includes(user.email.toLowerCase()) ? 'superadmin' : 'user';
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              role,  // Assign role during user creation
              profileImage: user.image,  // Assuming user.image holds the profile image URL
            });
            token.role = newUser.role;  // Ensure token has the correct role
          } else {
            token.role = existingUser.role;  // Use the role of an existing user
          }
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }

      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: { strategy: 'jwt' },
};
