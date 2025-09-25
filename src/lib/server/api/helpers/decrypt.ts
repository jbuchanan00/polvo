import * as crypto from "node:crypto"
import dotenv from 'dotenv'

dotenv.config()

export function decrypt(cipher: string, iv: string){
    const decipher = crypto.createDecipheriv(
    "aes-128-gcm", 
    Buffer.from(process.env.ACCESS_TOKEN_SECRET!, 'base64'),
    Buffer.from(iv, 'base64')
  );

  let plaintext = decipher.update(cipher, 'base64', 'utf8');
  plaintext += decipher.final('utf8');

  return plaintext;
}