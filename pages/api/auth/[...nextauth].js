import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
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
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isadmin) session.user.isadmin = token.isadmin;
      await db.connect();
      const user = await User.findOne({
        _id: token._id,
      });

      session.user.isursitoare = token.isursitoare;
      session.user.rezervari = user.rezervari;
      await db.disconnect();
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
            numarevenimente: user.numarevenimente,
            rezervari: user.rezervari,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
