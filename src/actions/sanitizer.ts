export const sanitizeAndTruncate = (text: string | null | undefined, maxLength: number = 100): string => {
    if (!text) return '';
    return text.replace(/<[^>]+>/g, '').slice(0, maxLength);
};