
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

interface User {
    name: string | null,
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

