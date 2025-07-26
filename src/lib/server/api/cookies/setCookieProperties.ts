import type { CookieSerializeOptions } from 'cookie'
import dotenv from 'dotenv'

dotenv.configDotenv()

export const setCookieProperties = (age = 3600 * 1000 * 24): CookieSerializeOptions & {path: string} => {
    const props = {
        httpOnly: true,
        secure: process.env.ENVIRONMENT !== 'dev',
        sameSite: 'strict' as const,
        maxAge: age,
        path: '/',
    }
    return props
}