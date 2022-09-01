import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../models/User";
import db from "../../../utils/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isadmin) token.isadmin = user.isadmin;
      if (user?.isursitoare) token.isursitoare = user.isursitoare;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isadmin) session.user.isadmin = token.isadmin;
      session.user.isursitoare = token.isursitoare;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isadmin: user.isadmin,
            isursitoare: user.isursitoare,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
