import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import dotenv from 'dotenv'

dotenv.config()

const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET)

export async function createToken(payload: JWTPayload){
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setExpirationTime('1h')
        .sign(secret)
}


export async function verifyToken(token: string){
    try {
        const {payload} = await jwtVerify(token, secret)
        return payload
    } catch(err){
        return null
    }
}
