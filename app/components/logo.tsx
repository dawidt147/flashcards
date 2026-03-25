import Image from "next/image";

interface ImageProps {
    width: number;
    height: number;
    className: string;
}

interface LogoProps extends ImageProps {
    type: string
}

const Logo: React.FC<LogoProps> = ({type, width, height, className}) => { 
    const src = type === 'color' ? '/next.svg' : '/next-white.svg';
    const alt = type === 'color' ? 'flashcard logo' : 'flashcard logo white';

    return (
        <Image
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
      />
    );
}
export default Logo;