import LanguageSwitcher from "@/components/inputs/language-switcher";

export default function Footer() {
    return (
        <footer className="footer p-4 flex justify-between align-middle">
            <div className="colophon">
                Copyright 2026 Torbacz company
            </div>
            <LanguageSwitcher />
        </footer>
    );
}