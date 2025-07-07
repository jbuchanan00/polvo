import { SignJWT, jwtVerify } from "jose";
import dotenv from 'dotenv'

dotenv.config()

const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET)

export async function createToken(payload: object){

}


export async function verifyToken(token: string){

}
