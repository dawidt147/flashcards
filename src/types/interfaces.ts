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
export interface ButtonProps {
    id: string;
    label: string;
    type: "button" | "submit" | "reset"
    name?: string;
    value?: string;
    className?: string;
}
export interface SearchBarProps {
    placeholder: string;
}