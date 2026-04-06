import { Section, Text } from '@react-email/components';
import { EmailLogo } from '@/components/emails/sections/logo';
import type { EmailBrandingProps } from '@/types/emails';

export function EmailHeader({ company, siteUrl }: EmailBrandingProps) {
  return (
    <Section className="mb-8">
      <EmailLogo siteUrl={siteUrl} />
      <Text className="mb-0 mt-3 text-center text-xs font-medium uppercase tracking-wide text-zinc-500">
        {company}
      </Text>
    </Section>
  );
}
