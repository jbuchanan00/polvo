import * as crypto from "node:crypto"
import dotenv from 'dotenv'

dotenv.config()

export function decrypt(cipher: string, iv: string, tag: string) {
  const buff   = Buffer.from(cipher, "base64");
  const ivBuff = Buffer.from(iv, "base64");
  const tagBuff= Buffer.from(tag, "base64");

  const decipher = crypto.createDecipheriv(
    "aes-128-gcm",
    Buffer.from(process.env.ACCESS_TOKEN_SECRET!, "hex"),
    ivBuff
  );

  decipher.setAuthTag(tagBuff);

  const plaintext = Buffer.concat([
    decipher.update(buff),
    decipher.final()
  ]);

  return plaintext.toString("utf8");
}
