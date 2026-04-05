import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import Logo from '@/components/logo';
import { WelcomeEmailProps } from '@/types/emails';

const WelcomeEmail = ({
  email,
  userName,
  company,
  activationLink,
}: WelcomeEmailProps) => {
  const previewText = `Activate your ${company} account — one click to get started`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto bg-zinc-50 font-sans">
          <Container className="mx-auto mb-10 max-w-[465px] rounded-2xl border border-solid border-zinc-200 bg-white px-8 py-10 shadow-sm">
            <Section className="mb-8">
              <Logo type="default" width={100} height={20} className="" />
            </Section>
            <Heading className="mx-0 my-0 mb-6 p-0 text-center text-2xl font-semibold tracking-tight text-zinc-900">
              Welcome to <strong>{company}</strong>
            </Heading>
            <Text className="m-0 text-start text-sm leading-relaxed text-zinc-600">
              Hello {userName},
            </Text>
            <Text className="mt-4 text-start text-sm leading-relaxed text-zinc-600">
              Thanks for signing up. To finish creating your account, confirm your
              email by clicking the button below. This link expires after a few
              days for security.
            </Text>
            <Text className="mt-2 text-start text-xs text-zinc-500">
              Signing up as: {email}
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-full bg-violet-600 px-6 py-3 text-center text-sm font-semibold text-white no-underline"
                href={activationLink}
              >
                Activate your account
              </Button>
            </Section>
            <Text className="m-0 text-start text-xs leading-relaxed text-zinc-500">
              If the button doesn&apos;t work, copy and paste this link into your
              browser:
            </Text>
            <Text className="mt-2 break-all text-start text-xs text-violet-700">
              <Link href={activationLink} className="underline">
                {activationLink}
              </Link>
            </Text>
            <Text className="mt-6 text-start text-sm text-zinc-600">
              Cheers,
              <br />
              The {company} team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
