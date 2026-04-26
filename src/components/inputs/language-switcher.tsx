'use client';

import { useCookie } from '@/lib/cookies';

export default function LanguageSwitcher() {
    const [locale, setLocale, deleteLocale] = useCookie('locale');

    return (
        <div>
            <select id="lang-switcher" 
                    onChange={(e) => {
                        setLocale(e.target.value, 60 * 60 * 24 * 30);
                        window.location.reload();
                    }} 
                    value={locale}>
                <option value="en">English</option>
                <option value="pl">Polish</option>
            </select>
        </div>
    );
}