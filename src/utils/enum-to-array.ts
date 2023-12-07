export const enumToArray = <T>(enumObject: T) => {
    const array = [];
    for (const key in enumObject) {
        array.push(enumObject[key]);
    }
    return array;
};
