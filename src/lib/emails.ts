import { resend } from '@/lib/resend';
import WelcomeEmail from '@/components/emails/welcome';
import { WelcomeEmailProps } from '@/types/emails';

export const SendWelcomeEmail = async ({
  email,
  userName,
  company,
  activationLink,
}: WelcomeEmailProps) => {
  const brand = company.trim() || 'Flashcards';
  const subject = `Confirm your email — ${brand}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject,
    react: WelcomeEmail({
      email,
      userName,
      company,
      activationLink,
    }),
  });
};