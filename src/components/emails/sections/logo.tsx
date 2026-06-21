import { Img, Link, Section } from '@react-email/components';
import type { EmailLogoProps } from '@/types/emails';

/** Server-safe logo for React Email — uses absolute URLs, not `next/image`. */
export function EmailLogo({
  siteUrl,
  variant = 'default',
}: EmailLogoProps) {
  const origin = siteUrl.replace(/\/$/, '');
  const src = `${origin}/assets/logo-${variant}.svg`;

  return (
    <Section className="mb-0 text-center">
      <Link href={origin}>
        <Img
          src={src}
          alt="Logo"
          width={100}
          height={20}
          className="mx-auto block"
        />
      </Link>
    </Section>
  );
}
