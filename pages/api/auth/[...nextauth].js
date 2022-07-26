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
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.isUrsitoare) token.isUrsitoare = user.isUrsitoare;
      if (user?.evenimente) token.evenimente = user.evenimente;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      await db.connect();
      const user = await User.findOne({
        _id: token._id,
      });
      await db.disconnect();
      session.user.isUrsitoare = token.isUrsitoare;
      session.user.evenimente = user.evenimente;
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
            isAdmin: user.isAdmin,
            isUrsitoare: user.isUrsitoare,
            numarEvenimente: user.numarEvenimente,
            evenimente: user.evenimente,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
