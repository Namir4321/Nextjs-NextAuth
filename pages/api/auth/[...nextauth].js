import { connect } from "mongoose";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbconnect from "../../../lib/database/dbconnect";
import User from "../../../lib/model/User";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials);
        await dbconnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found!");
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Could not login in!");
        }

        return { email: user.email };
      },
    }),
  ],
});
