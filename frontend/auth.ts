import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "./actions/user.action";
import { userSignin } from "./actions/auth.action";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredential = z
          .object({
            username: z.string().min(2),
            password: z.string().min(2),
          })
          .safeParse(credentials);

        if (parsedCredential.success) {
          const { username, password } = parsedCredential.data;

          const user = await getUser({
            username,
          });

          if (!user) return null;

          const authenticatedUser = await userSignin({
            username,
            password,
          });

          if (authenticatedUser) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
