// converts **text** to <strong>text</strong>
export const parseBoldText = (text: string) => {
    if (!text) return '';

    try {
        if (typeof text !== 'string') return text;

        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    } catch {
        return text;
    }
};
