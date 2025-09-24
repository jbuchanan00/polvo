
function camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

export function keysToSnake(obj: Record<string, any>): Record<string, any>{
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]): [string, any] => [
            camelToSnake(key), value
        ])
    )
}

