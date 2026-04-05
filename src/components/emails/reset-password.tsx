import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import Logo from '@/components/logo';
import { ResetPasswordEmailProps } from '@/types/emails';

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="m-auto bg-zinc-50 py-8 font-sans">
          <Container className="mx-auto max-w-[465px] rounded-2xl border border-solid border-zinc-200 bg-white px-8 py-10 shadow-sm">
            <Section className="mb-8">
              <Logo
                type="default"
                width={100}
                height={20}
                className=""
              />
            </Section>
            <Section>
              <Text className="m-0 text-base font-normal leading-relaxed text-zinc-600">
                Hi {userFirstname},
              </Text>
              <Text className="mt-4 text-base font-normal leading-relaxed text-zinc-600">
                Someone recently requested a password reset for your account. If
                this was you, you can set a new password here:
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
                If you don&apos;t want to change your password or didn&apos;t
                request this, you can ignore this message.
              </Text>
              <Text className="mt-4 text-base font-normal leading-relaxed text-zinc-600">
                For your security, please don&apos;t forward this email to
                anyone.{' '}
                <Link className="font-medium text-violet-600 underline" href={resetPasswordLink}>
                  Security tips
                </Link>
              </Text>
              <Text className="mt-6 text-base font-normal leading-relaxed text-zinc-600">
                — The team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
