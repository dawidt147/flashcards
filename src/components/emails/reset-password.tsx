import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { EmailFooter } from '@/components/emails/sections/footer';
import { EmailHeader } from '@/components/emails/sections/header';
import { ResetPasswordEmailProps } from '@/types/emails';

export const ResetPasswordEmail = ({
  email,
  userName,
  company,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  const brand = company.trim() || 'Flashcards';
  const siteUrl = new URL(resetPasswordLink).origin;

  return (
    <Html>
      <Head />
      <Preview>Reset your {brand} password</Preview>
      <Tailwind>
        <Body className="m-auto bg-zinc-50 py-8 font-sans">
          <Container className="mx-auto max-w-[465px] rounded-2xl border border-solid border-zinc-200 bg-white px-8 py-10 shadow-sm">
            <EmailHeader company={brand} siteUrl={siteUrl} />
            <Section>
              <Text className="m-0 text-base font-normal leading-relaxed text-zinc-600">
                Hi {userName},
              </Text>
              <Text className="mt-4 text-base font-normal leading-relaxed text-zinc-600">
                We received a request to reset the password for your account. If
                you made this request, choose a new password using the button
                below.
              </Text>
              <Section className="my-8 text-center">
                <Button
                  className="inline-block rounded-full bg-violet-600 px-6 py-3 text-center text-[15px] font-semibold text-white no-underline"
                  href={resetPasswordLink}
                >
                  Reset password
                </Button>
              </Section>
              <Text className="m-0 text-base font-normal leading-relaxed text-zinc-600">
                If you didn&apos;t request a password reset, you can ignore this
                email — your password will stay the same. Don&apos;t forward this
                email to anyone.
              </Text>
              <Text className="mt-6 text-base font-normal leading-relaxed text-zinc-600">
                Thanks,
                <br />
                The {brand} team
              </Text>
            </Section>
            <EmailFooter company={brand} siteUrl={siteUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
