import { IconFlagMEX, IconFlagUSA } from "@/icons/allIcons";

export const languages: Record<string, { code: string; name: string; flag: typeof IconFlagUSA }> = {
    en: {
        code: 'en',
        name: 'English',
        flag: IconFlagUSA
    },
    es: {
        code: 'es',
        name: 'Español',
        flag: IconFlagMEX
    }
};

export const defaultLang = 'en';
export const showDefaultLang = false;

export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.mayanReef': 'Mayan Reef',
        'nav.puertoMorelos': 'Puerto Morelos',
        'nav.contact': 'Contact',
        'footer.terms': 'Privacy',
        'footer.design': 'Design by Grupo Extreme',
    },
    es: {
        'nav.home': 'Inicio',
        'nav.mayanReef': 'Arrecife Maya',
        'nav.puertoMorelos': 'Puerto Morelos',
        'nav.contact': 'Contacto',
        'footer.terms': 'Privacidad',
        'footer.design': 'Diseñado por Grupo Extreme',
    }
} as const;