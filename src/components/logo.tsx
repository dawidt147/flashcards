import Image from "next/image";
import {LogoProps} from '../types/interfaces';

const Logo: React.FC<LogoProps> = ({type, width, height, className}) => { 
    return (
        <Image
        className={className}
        src={`/logo-${type}.svg`}
        alt={`flashcard logo ${type}`}
        width={width}
        height={height}
        priority
      />
    );
}
export default Logo;