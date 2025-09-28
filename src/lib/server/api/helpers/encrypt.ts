import dotenv from 'dotenv'
import * as crypto from 'node:crypto'

dotenv.config()

export function encrypt(token: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    "aes-128-gcm",
    Buffer.from(process.env.ACCESS_TOKEN_SECRET!, "hex"),
    iv
  );

  const ciphertext = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final()
  ]).toString("base64");

  const tag = cipher.getAuthTag().toString("base64");

  return { ciphertext, iv: iv.toString("base64"), tag };
}