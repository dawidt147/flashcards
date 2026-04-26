'use client';

import { useTranslations } from 'next-intl';
import { useCookie } from '@/lib/cookies';

export default function LanguageSwitcher() {
    const [locale, setLocale] = useCookie('locale');
    const t = useTranslations('Common.language');

    return (
        <div>
            <select id="lang-switcher" 
                    onChange={(e) => {
                        setLocale(e.target.value, 60 * 60 * 24 * 30);
                        window.location.reload();
                    }} 
                    value={locale}>
                <option value="en">{t('english')}</option>
                <option value="pl">{t('polish')}</option>
            </select>
        </div>
    );
}