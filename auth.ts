import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';
import { SendWelcomeEmail } from '@/lib/emails';
import { WelcomeEmailProps } from '@/types/emails';
import { getOptionValue } from '@/lib/convex/options';
import {
  getUserByEmail,
  findUserByEmailOrUsername,
  createPendingAccountWithActivation,
} from '@/lib/convex/users';

const API_ACTIVATE_ACCOUNT_SLUG = '/api/auth/activate/';

const errorCodes = {
  invalidCredentials: "Invalid username or password",
  inactiveAccount: "Account is not activated",
  accountExists: "User already exists",
  signUpUnknown: "There was an issue with creating your account",
}

function authError(message: string) {
  return new Error( JSON.stringify({ errors: message, status: false }));
}

function getActivationToken() {
  return cryptoRandomString({
    length: 20,
    type: 'url-safe',
  });
}

async function getActivationLink(token: string): Promise<string> {
  let url = await getOptionValue("siteUrl");
  const slug = API_ACTIVATE_ACCOUNT_SLUG;

  if (!url) {
    return "";
  }

  url = url.endsWith('/') ? url.slice(0, -1) : url;

  return url + slug + token;
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
          const user = await getUserByEmail(email);

          if (!user) throw authError(errorCodes.invalidCredentials);
          if (user.status == 'pending') throw authError(errorCodes.inactiveAccount);

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        
        throw authError(errorCodes.invalidCredentials);
      },
    }),
  ],
});

export const signUp = async (formData: FormData) => {
  const credentials = Object.fromEntries(formData);
  const parsedCredentials = z
  .object({ email: z.email(), userName: z.string().min(5), password: z.string().min(6) })
  .safeParse(credentials);

  if (parsedCredentials.success) {
    try {
      const { email, userName, password } = parsedCredentials.data;
      const user = await findUserByEmailOrUsername(email, userName);
  
      if (user) return errorCodes.accountExists;
  
      const saltRounds = 10;
      const status = "pending";
      const companyName = await getOptionValue("siteTitle") || "";
      const activationToken = getActivationToken();
      const activationLink = await getActivationLink(activationToken);
  
      if (!activationLink) return errorCodes.signUpUnknown;
  
      const hash = await bcrypt.hash(password, saltRounds);
      const userId = await createPendingAccountWithActivation(email, userName, hash, status, activationToken);
      const emailProps: WelcomeEmailProps = {
        email: email,
        userName: userName,
        company: companyName,
        activationLink: activationLink
      }
  
      if (userId) {
        await SendWelcomeEmail(emailProps);
        return userId;
      }

      return errorCodes.signUpUnknown;
    } catch (error) {
      console.error(error);
      return errorCodes.signUpUnknown;
    }
  }

  return errorCodes.invalidCredentials;
};
