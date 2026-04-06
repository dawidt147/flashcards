import { Hr, Link, Section, Text } from '@react-email/components';
import type { EmailBrandingProps } from '@/types/emails';

export function EmailFooter({ company, siteUrl }: EmailBrandingProps) {
  const year = new Date().getFullYear();
  const origin = siteUrl.replace(/\/$/, '');
  const displayHost = origin.replace(/^https?:\/\//, '');

  return (
    <Section className="mt-8">
      <Hr className="m-0 border-0 border-t border-solid border-zinc-200" />
      <Text className="mb-0 mt-6 text-center text-xs leading-relaxed text-zinc-500">
        © {year} {company}. All rights reserved.
      </Text>
      <Text className="mb-0 mt-2 text-center text-xs text-zinc-500">
        <Link href={origin} className="text-violet-600 underline">
          {displayHost}
        </Link>
      </Text>
    </Section>
  );
}
