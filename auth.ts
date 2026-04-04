import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api";
import type { Doc, Id } from "./convex/_generated/dataModel";

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
 
async function getUser(email: string): Promise<Doc<"users"> | null> {
    return await client.query(api.users.getUserByEmail, {email});
}

async function createAccount(email: string, password: string): Promise<Id<"users">> {
  const userName = email;
  return await client.mutation(api.users.createUser, { userName, email, password });
}
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export const signUp = async (formData: FormData) => {
  console.log(formData);
  const credentials = Object.fromEntries(formData);
  console.log(credentials);
  const parsedCredentials = z
  .object({ email: z.email(), password: z.string().min(6) })
  .safeParse(credentials);

  console.log(parsedCredentials);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    const user = await getUser(email);

    if (user) {
      console.log('User already exists');
      return "User already exists";
    }

    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds, async function(err, hash) {
      if (err || !hash) {
        return false;
      }

      if (hash) {
        const userId = await createAccount(email, hash);
        return userId;
      }
    });
  }

  console.log('Invalid credentials');
  return 'Invalid credentials';
};