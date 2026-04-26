'use client';
 
import {
  AtSign,
  KeyIcon,
  CircleAlert,
  CircleCheck,
  ArrowRightIcon,
} from 'lucide-react';
import Button from "@/components/buttons/button";
import GoogleLogo from "@/components/icons/google-logo";
import { useActionState } from 'react';
import { authenticate } from 'lib/actions';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

const authMessageKeys = [
  'emailConfirmed',
  'alreadyActive',
  'oauthAlreadyPending',
  'invalidCredentials',
  'unknown',
] as const;

type AuthMessageKey = (typeof authMessageKeys)[number];

function isAuthMessageKey(value: string | undefined): value is AuthMessageKey {
  return authMessageKeys.includes(value as AuthMessageKey);
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const t = useTranslations('Auth');
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const activatedMessageStatus = searchParams.get('activated');
  
  let activatedMessageKey: AuthMessageKey | null = null;
  switch (activatedMessageStatus) {
    case '1':
      activatedMessageKey = 'emailConfirmed';
      break;
    case 'already':
      activatedMessageKey = 'alreadyActive';
      break;
    case 'oauth-already-pending':
      activatedMessageKey = 'oauthAlreadyPending';
      break;
    default:
      break;
  }

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const errorMessageKey = isAuthMessageKey(errorMessage) ? errorMessage : 'unknown';
 
  return (
    <form action={formAction} className="space-y-3 m-auto">
      <div className="flex-1 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          {t('login.title')}
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              {t('login.emailLabel')}
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10! text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder={t('login.emailPlaceholder')}
                required
              />
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-300" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              {t('login.passwordLabel')}
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10! text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder={t('login.passwordPlaceholder')}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-300" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          id="log-in"
          type="submit"
          disabled={isPending}
          className="bg-primary mt-4 flex w-full items-center justify-center gap-2"
        >
          {t('login.submit')}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className='text-center mt-4'>{t('login.divider')}</div>
        <Button
          id="log-in-with-google"
          type="button"
          className="bg-primary mt-4 flex w-full items-center justify-between gap-2"
          onClick={() => signIn('google', { callbackUrl: callbackUrl })}          
        >
          {t('login.google')}
          <GoogleLogo width={16} height={16} className='block' />
        </Button> 
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{t(`messages.${errorMessageKey}`)}</p>
            </>
          )}
          {activatedMessageKey && (
            <>
                <CircleCheck className="h-5 w-5 text-green-500" />
                <p className="text-sm text-green-500">{t(`messages.${activatedMessageKey}`)}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}