import type { CookieSerializeOptions } from 'cookie'
import dotenv from 'dotenv'

dotenv.configDotenv()

export const setCookieProperties = (): CookieSerializeOptions & {path: string} => {
    const props = {
        httpOnly: true,
        secure: process.env.ENVIRONMENT !== 'dev',
        sameSite: 'strict' as const,
        maxAge: 3600 * 1000 * 24,
        path: '/',
    }
    return props
}