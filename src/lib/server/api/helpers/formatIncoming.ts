

const snakeToCamel = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function keysToCamel(obj: Record<string, any>): Record<string, any>{
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]): [string, any] => [snakeToCamel(key), value])
    )
}