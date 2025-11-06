// Remplazar caracteres especiales en HTML
export function replaceHtmlEntities(str: string) {
    const htmlEntities: { [key: string]: string } = {
        '&amp;': '&',
        '&#038;': '&',
        "&#8211;": "-",
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "'",
    };

    return str.replace(/&[a-zA-Z0-9#]+;/g, (entity) => htmlEntities[entity] || entity);
}

// Truncar textos
export function truncateText(text: string, limit: number) {
    if (text.length <= limit) {
        return { visibleText: text, hiddenText: '' };
    }

    const visibleText = text.slice(0, limit);
    const hiddenText = text.slice(limit);

    return { visibleText, hiddenText };
}

// Formatear fechas para Blog
export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}