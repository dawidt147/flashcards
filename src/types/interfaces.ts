import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ImageProps {
    width: number;
    height: number;
    alt?: string;
    src?: string;
    className?: string;
}
export interface LogoProps extends ImageProps {
    type: "default" | "white"
}

export interface IconProps {
    width: number;
    height: number;
    className?: string;
}

/** Native button props + optional `label` when you prefer a string prop over `children`. */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: ReactNode;
};
export interface SearchBarProps {
    placeholder: string;
}