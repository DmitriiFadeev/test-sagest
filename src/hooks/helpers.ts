export function objectsEqual<T extends Record<string, any>>(
    object1: T,
    object2: T
): boolean {
    if (typeof object1 === 'object' && Object.keys(object1).length > 0) {
        return Object.keys(object1).length === Object.keys(object2).length &&
            Object.keys(object1).every(p => objectsEqual(object1[p], object2[p]))
    }
    return object1 === object2
}

export function arraysEqual<K extends object>(array1: K[], array2: K[]) {
    return (
        array1.length === array2.length &&
        array1.every((o, idx) => objectsEqual(o, array2[idx]))
    );
}

export async function debounce<T> (fn: T, wait: number) {
    console.log('fn', fn)
    let timer: ReturnType<typeof setTimeout>
    return (event: Event) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            if (typeof fn === 'function') {
                fn(event)
            }
        }, wait)
    }
}