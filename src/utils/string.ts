import moment from "moment";

export function truncateString({
    text,
    start = 4,
    end = 4,
    separator = '...',
}: {
    text: string;
    start?: number;
    end?: number;
    separator?: string;
}): string {
    if (!text) {
        return text;
    }
    const textLength = text.length;
    if (textLength <= start + end) {
        return text;
    }
    const startText = text.substr(0, start);
    const endText = text.substr(textLength - end);
    return `${startText}${separator}${endText}`;
}

export function toInteger2Digits(value: number): string {
    if (isNaN(value)) return '0';
    return value < 10 ? `0${value}` : `${value}`;
}

export function convertEpochTime(time: number): string {
    if (!time) return '';
    return moment(new Date(time * 1000)).format('MM/DD/YYYY HH:mm:ss');
}
