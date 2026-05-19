import type { ui } from "@/i18n/ui";
// Desktop
import NatGeoSnorkelDesk from "./snorkel-experience-in-puerto-morelos.webp";
import RegularSnorkelDesk from "./discover-the-reef-life-snorkel-puerto-morelos.webp";
import PrivateSnorkelDesk from "./private-snorkel-in-puerto-morelos.webp";
import RegularSnorkelDeskES from "./es/discover-the-reef-life-snorkel-puerto-morelos-es.webp";
import PrivateSnorkelDeskES from "./es/private-snorkel-in-puerto-morelos-es.webp";
// Mobile
import NatGeoSnorkelMob from "./mobile/snorkel-experience-in-puerto-morelos-mobile.webp";
import RegularSnorkelMob from "./mobile/discover-the-reef-life-snorkel-puerto-morelos-mobile.webp";
import PrivateSnorkelMob from "./mobile/private-snorkel-in-puerto-morelos-mobile.webp";
import RegularSnorkelMobES from "./es/mobile/discover-the-reef-life-snorkel-puerto-morelos-mobile-es.webp";
import PrivateSnorkelMobES from "./es/mobile/private-snorkel-in-puerto-morelos-mobile-es.webp";

const images = {
    en: {
        desktop: [
            { img: NatGeoSnorkelDesk, alt: "Snorkeling Adventure Experience Recognized by National Geographic Traveller", href: "https://snorkelingadventure.com/blog/puerto-morelos-national-reef-park/", target: true },
            { img: RegularSnorkelDesk, alt: "snorkel in puerto morelos", href: "/snorkel-adventuring-details/" },
            { img: PrivateSnorkelDesk, alt: "private snorkel in puerto morelos", href: "/private-snorkeling-in-puerto-morelos/" }
        ],
        mobile: [
            { img: NatGeoSnorkelMob, alt: "Snorkeling Adventure Experience Recognized by National Geographic Traveller", href: "https://snorkelingadventure.com/blog/puerto-morelos-national-reef-park/", target: true },
            { img: RegularSnorkelMob, alt: "snorkel in puerto morelos",  href: "/snorkel-adventuring-details/" },
            { img: PrivateSnorkelMob, alt: "private snorkel in puerto morelos", href: "/private-snorkeling-in-puerto-morelos/" }
        ]
    },
    es: {
        desktop: [
            { img: NatGeoSnorkelDesk, alt: "Experiencia de aventura de snorkel reconocida por National Geographic Traveller", href: "https://snorkelingadventure.com/blog/puerto-morelos-national-reef-park/", target: true },
            { img: RegularSnorkelDeskES, alt: "snorkel en puerto morelos", href: "/snorkel-adventuring-details/" },
            { img: PrivateSnorkelDeskES, alt: "snorkel privado en puerto morelos", href: "/private-snorkeling-in-puerto-morelos/" }
        ],
        mobile: [
            { img: NatGeoSnorkelMob, alt: "Experiencia de aventura de snorkel reconocida por National Geographic Traveller", href: "https://snorkelingadventure.com/blog/puerto-morelos-national-reef-park/", target: true },
            { img: RegularSnorkelMobES, alt: "snorkel en puerto morelos", href: "/snorkel-adventuring-details/" },
            { img: PrivateSnorkelMobES, alt: "snorkel privado en puerto morelos", href: "/private-snorkeling-in-puerto-morelos/" }
        ]
    }
};

const getSlides = (lang: keyof typeof ui) => {
    const categoryImages = images[lang] || images["en"];

    if (!categoryImages) {
        return [];
    }

    return categoryImages;
};

export { getSlides };