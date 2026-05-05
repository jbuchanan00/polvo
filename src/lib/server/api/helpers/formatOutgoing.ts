
function camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

function renameKey(str: string): string {
    return str === "description" ? "bio" : str
}

function formatKey(str: string): string {
    str = camelToSnake(str)
    return renameKey(str)
}

export function keysToSnake(obj: Record<string, any>): Record<string, any>{
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]): [string, any] => [
            formatKey(key), value
        ])
    )
}

