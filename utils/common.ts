export const isObject = (obj: any): boolean => {
    // Check if the input is an object and not null
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}


export const isObjectEmpty = (obj: any): boolean => {
    // Check if the input is an object and not null
    if (isObject(obj)) {
        return Object.keys(obj).length === 0;
    }
    // Check if the object has no own properties
    return true;
}

export const compareObjects = (obj1: any, obj2: any): boolean => {
    // Check if both are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    // Check if they have the same number of keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if all keys and values are the same
    for (const key of keys1) {
        if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

export const compareObjectContents = (obj1: any, obj2: any): boolean => {
    // Check if both are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    // Check if they have the same number of keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if all keys and values are the same
    for (const key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            if (!compareObjectContents(obj1[key], obj2[key])) {
                return false;
            }
        } else if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

export const checkObjectChanges = (obj1: any, obj2: any): boolean => {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if they have the same number of keys
    if (keys1.length !== keys2.length) {
        return true;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
            return true;
        }
    }

    return false;
}

export const getObjectDifferences = (obj1: any, obj2: any): any => {
    const diff: any = {};

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj2[key] !== obj1[key]) {
                diff[key] = obj2[key];
            }
        }
    }

    return diff;
}