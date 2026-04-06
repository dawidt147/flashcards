import {
  Body,
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

const COMPANY = 'Flashcards';

/** Minimal template for Resend / `/api/send` smoke tests — no props. */
export default function TestEmail() {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>Test email — Flashcards</Preview>
      <Tailwind>
        <Body className="m-auto bg-zinc-50 font-sans">
          <Container className="mx-auto max-w-[465px] rounded-2xl border border-solid border-zinc-200 bg-white px-8 py-10">
            <EmailHeader company={COMPANY} siteUrl={siteUrl} />
            <Section>
              <Text className="m-0 text-base text-zinc-900">
                This is a test email from Flashcards.
              </Text>
              <Text className="mt-4 text-sm leading-relaxed text-zinc-600">
                Use this message only to verify that transactional email is
                working from your environment.
              </Text>
            </Section>
            <EmailFooter company={COMPANY} siteUrl={siteUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
