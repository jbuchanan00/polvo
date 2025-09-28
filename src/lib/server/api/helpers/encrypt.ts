import dotenv from 'dotenv'
import * as crypto from 'node:crypto'

dotenv.config()

export function encrypt(token: string){
    const iv = crypto.randomBytes(12).toString('base64')

    const cipher = crypto.createCipheriv('aes-128-gcm', Buffer.from(process.env.ACCESS_TOKEN_SECRET!, 'hex'), iv)

    let ciphertext = cipher.update(token, 'utf8', 'base64');
 
    ciphertext += cipher.final('base64');
    
    return { ciphertext, iv};
}