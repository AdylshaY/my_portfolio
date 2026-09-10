'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [currentLang, setCurrentLang] = useState('tr');

    useEffect(() => {
        if (pathname.startsWith('/en')) {
            setCurrentLang('en');
        } else {
            setCurrentLang('tr');
        }
    }, [pathname]);

    const toggleLanguage = () => {
        const newLang = currentLang === 'tr' ? 'en' : 'tr';

        // Logic to switch path
        let newPath = '';

        if (newLang === 'en') {
            // Switch TR -> EN
            // If current path has no lang prefix (default TR), add /en
            newPath = `/en${pathname}`;
        } else {
            // Switch EN -> TR
            // Remove /en prefix
            newPath = pathname.replace(/^\/en/, '') || '/';
        }

        router.push(newPath);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="ml-4 px-3 py-1 rounded-full border border-primary/20 hover:border-primary/50 text-sm font-medium transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Switch Language"
        >
            <span className={currentLang === 'tr' ? 'text-primary font-bold' : 'text-muted-foreground'}>TR</span>
            <span className="text-muted-foreground">/</span>
            <span className={currentLang === 'en' ? 'text-primary font-bold' : 'text-muted-foreground'}>EN</span>
        </button>
    );
}
