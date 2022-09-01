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
      if (user?.rezervari) token.rezervari = user.rezervari;
      if (user?.rezervarilemele) token.rezervarilemele = user.rezervarilemele;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;

      await db.connect();
      const user = await User.findOne({
        _id: token._id,
      });
      await db.disconnect();
      session.user.isadmin = user.isadmin;
      session.user.isursitoare = token.isursitoare;
      session.user.rezervari = user.rezervari;
      session.user.rezervarilemele = user.rezervarilemele;

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
            rezervari: user.rezervari,
            rezervarilemele: user.rezervari,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
