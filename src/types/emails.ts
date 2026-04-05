export interface EmailProps {
    email: string;
    userName: string;
    company: string;
}

export interface WelcomeEmailProps extends EmailProps {
    activationLink: string;
}

export interface ResetPasswordEmailProps extends EmailProps {
    resetPasswordLink: string;
}