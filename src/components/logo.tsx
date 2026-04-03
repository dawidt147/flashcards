import Image from "next/image";
import Link from "next/link";
import {LogoProps} from '../types/interfaces';

const Logo: React.FC<LogoProps> = ({type, width, height, className}) => { 
    return (
        <Link href="/">
          <Image
            className={className}
            src={`/logo-${type}.svg`}
            alt={`flashcard logo ${type}`}
            width={width}
            height={height}
            priority
          />
        </Link>
    );
}
export default Logo;