import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Menu() {
    const t = useTranslations("Navigation");

    return (
        <nav className="menu">
            <ul className='flex gap-2'>
                <li>
                    <Link href="/products">{t("products")}</Link>
                </li>
                <li>
                    <Link href="/about-us">{t("aboutUs")}</Link>
                </li>
            </ul>
        </nav>
    );
}