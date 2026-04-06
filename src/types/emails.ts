export interface EmailProps {
    email: string;
    userName: string;
    company: string;
}

/** Absolute site origin for email assets (logo URL, footer links). */
export interface EmailBrandingProps {
    company: string;
    siteUrl: string;
}

export interface EmailLogoProps {
    siteUrl: string;
    variant?: 'default' | 'white';
}

export interface WelcomeEmailProps extends EmailProps {
    activationLink: string;
}

export interface ResetPasswordEmailProps extends EmailProps {
    resetPasswordLink: string;
}