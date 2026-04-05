import { Resend } from 'resend';
import WelcomeEmail from '@/components/emails/welcome';
import { WelcomeEmailProps } from '@/types/emails';

export const SendWelcomeEmail = async ({
    email,
    userName,
    company,
    activationLink
  }: WelcomeEmailProps) => { 
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Confirm your email — ${company}`,
      react: <WelcomeEmail email={email} userName={userName} company={company} activationLink={activationLink} />,
    });
}