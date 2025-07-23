
interface RegisteringUser {
    email: string,
    role: number,
    givenName: string,
    familyName: string
}

interface HashAndSalt {
    hash: string,
    salt: string
}

declare type Coordinates = {
    latitude: number,
    longitude: number
}

type User = {[key: string]: any}

interface User {
    id: string,
    firstName: string | null,
    lastName: string | null,
    username: string,
    role: number,
    location: Location | null
}

interface FrontEndUser {
    id: string,
    first_name: string | null,
    last_name: string | null,
    username: string,
    role: number,
    location: Location | null
}

interface Location {
    id: number,
    name: string,
    state: string | null,
    country: string | null,
    coords: Coordinates
}

interface Post {
    id: number | string,
    description: string,
    image: string,
    date: Date | string | number
}

interface AuthProvider {
    id?: string,
    userId: string,
    provider: Providers,
    providerUserId?: string | number | null,
    email: string
}

type Providers = 'google' | 'native'

