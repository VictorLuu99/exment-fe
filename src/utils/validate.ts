export const validateKeypress = (event: any, pattern: string) => {
    if (!new RegExp(pattern).test(event.key)) event.preventDefault();
    return;
};