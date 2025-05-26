
interface RegisteringUser {
    email: string,
    role: string,
    name: string
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
    location: Coordinates | null
}

interface Post {
    id: number | string,
    description: string,
    image: string,
    date: Date | string | number
}