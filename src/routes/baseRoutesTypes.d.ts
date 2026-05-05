
interface RegisteringUser {
    email: string,
    username: string
}

interface HashAndSalt {
    hash: string,
    salt: string
}

declare type Coordinates = {
    latitude: number,
    longitude: number
}

declare type XYCoordinates = {
    x: number,
    y: number
}

interface UserInterface {
    id: string,
    firstName: string | null,
    lastName: string | null,
    username: string,
    roleId: number,
    location: Location | string | XYCoordinates | null,
    shopName?: string | null,
    description: string | null
}

interface FrontEndUser {
    id: string,
    first_name: string | null,
    last_name: string | null,
    username: string,
    role: number,
    location: Location | null,
    shop_name?: string | null
}

interface Location {
    id: number,
    name: string,
    state: string | null,
    country: string | null,
    coords: Coordinates | XYCoordinates,
    Ranking?: number | null
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

interface ProfileDto {
    user: User,
    posts: Post[],
    profilePicture: string,
    isSelf: boolean,
    pictureExt: string,
    userInstagramAuthed: boolean,
    oauthUrl: string
    
}

type Providers = 'google' | 'native'

