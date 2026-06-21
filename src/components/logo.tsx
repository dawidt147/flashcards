import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {LogoProps} from '../types/interfaces';

const Logo: React.FC<LogoProps> = ({type, width, height, className}) => { 
    const t = useTranslations("Accessibility");

    return (
      <Link href="/">
        <Image
          className={className}
          src={`/assets/logo-${type}.svg`}
          alt={t("logoAlt", { type })}
          width={width}
          height={height}
          priority
        />
      </Link>
    );
}
export default Logo;