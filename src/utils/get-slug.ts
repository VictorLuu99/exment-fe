export const getSlugFromName = (name: string | undefined): string | undefined => {
    if (name === undefined) return undefined;
    return name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};
