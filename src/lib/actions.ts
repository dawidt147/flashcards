'use server';
 
import { signIn, signUp } from '@/root/auth';
import { AuthError } from 'next-auth';

type CreateAccountState = {
  error?: string;
  success?: string;
}
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createAccount(
  prevState: CreateAccountState | undefined,
  formData: FormData,
): Promise<CreateAccountState> {
    try {
      const result = await signUp(formData);

      if (typeof result == "string") {
        return { error: result };
      }

      return {
        success: 'Account created. Check your email for a link to confirm your address.',
      };
  } catch (error) {
    if (error) {
      return { error: "Register error" };
    }
    throw error;
  }
}