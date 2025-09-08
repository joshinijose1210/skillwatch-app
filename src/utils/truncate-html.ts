export const removeHtmlTagsAndTruncate = (tempStr: string, maxCharLength: number): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = tempStr;

    const truncate = (text: string): string => {
        return text.length > maxCharLength ? `${text.substring(0, maxCharLength)}...` : text;
    };

    return truncate(tempDiv.textContent || tempDiv.innerText || '');
};
