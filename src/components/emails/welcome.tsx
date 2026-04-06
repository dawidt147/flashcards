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
import { EmailFooter } from '@/components/emails/sections/footer';
import { EmailHeader } from '@/components/emails/sections/header';
import { WelcomeEmailProps } from '@/types/emails';

const WelcomeEmail = ({
  email,
  userName,
  company,
  activationLink,
}: WelcomeEmailProps) => {
  const brand = company.trim() || 'Flashcards';
  const previewText = `Confirm your email to get started with ${brand}`;
  const siteUrl = new URL(activationLink).origin;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto bg-zinc-50 font-sans">
          <Container className="mx-auto mb-10 max-w-[465px] rounded-2xl border border-solid border-zinc-200 bg-white px-8 py-10 shadow-sm">
            <EmailHeader company={brand} siteUrl={siteUrl} />
            <Heading className="mx-0 my-0 mb-6 p-0 text-center text-2xl font-semibold tracking-tight text-zinc-900">
              Welcome to <strong>{brand}</strong>
            </Heading>
            <Text className="m-0 text-start text-sm leading-relaxed text-zinc-600">
              Hi {userName},
            </Text>
            <Text className="mt-4 text-start text-sm leading-relaxed text-zinc-600">
              Thanks for signing up. Confirm your email address to finish creating
              your account — use the button below. For your security, this link
              expires in 7 days.
            </Text>
            <Text className="mt-2 text-start text-xs text-zinc-500">
              You registered with: {email}
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-full bg-violet-600 px-6 py-3 text-center text-sm font-semibold text-white no-underline"
                href={activationLink}
              >
                Confirm your email
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
              Thanks,
              <br />
              The {brand} team
            </Text>
            <EmailFooter company={brand} siteUrl={siteUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
