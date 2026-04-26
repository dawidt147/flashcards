import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/inputs/language-switcher";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="footer p-4 flex justify-between align-middle">
            <div className="colophon">
                {t("copyright")}
            </div>
            <LanguageSwitcher />
        </footer>
    );
}