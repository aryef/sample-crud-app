export const isEmpty: (string: any) => boolean = (
    string: any,
): boolean => {
    return !string || string.length === 0;
};

export const pluralize: (text: string, count: number) => string = (
    text: string,
    count: number,
): string => {
    return count > 1 || count === 0 ? `${text}s` : text;
};

export const capitalizeFirstLetter: (word: string) => string = (
    word: string,
): string => {
    return word.charAt(0).toUpperCase() + word.substring(1);
};

export const elide: (
    text: string,
    length: number,
    emptyState: string,
) => string = (
    text: string,
    length: number = 140,
    emptyState = '...',
) => {
    if (isEmpty(text)) {
        return '';
    }

    if (text.length < length) {
        return text.trim();
    }

    return `${text.substring(0, length)} ${emptyState}`;
};

export const elide_lines: (
    text: string,
    length: number,
    emptyState: string,
) => string[] = (
    text: string,
    length: number = 140,
    emptyState = '...',
) => {
    if (isEmpty(text)) {
        return [];
    }

    const print_lines: string[] = text.split('\n');

    if (print_lines.length < length) {
        return print_lines;
    }

    const output: string[] = print_lines.slice(1, length);
    output.push(emptyState);

    return output;
};

export const replaceAt: (
    source: string,
    index: number,
    replacement: string,
) => string = (
    source: string,
    index: number,
    replacement: string,
) => {
    return (
        source.substring(0, index - 1) +
        replacement +
        source.substring(index + replacement.length)
    );
};

export const isString: (x: any) => boolean = (x: any) => {
    return Object.prototype.toString.call(x) === '[object String]';
};
