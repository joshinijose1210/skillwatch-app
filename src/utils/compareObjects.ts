export const compareObjects = (obj1: any, obj2: any) => {
    const keys = Object.keys(obj1);

    for (const key of keys) {
        if (key === 'errors') {
            continue;
        }
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
};
