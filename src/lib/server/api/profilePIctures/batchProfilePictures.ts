import * as fs from 'fs'
import { resolve } from 'path'

export async function batchProfilePictures(base_path: string, userIds: string[], extensions: Map<string, string>){
    let profilePictures: string[] = []
    let profilePicturesBuffer: Buffer<ArrayBufferLike>[] = []
    let picturesToFetch: Promise<Buffer<ArrayBufferLike>>[] = []
    let onRejected = () => Buffer.from("")
    userIds.forEach(async (userId) => {
        const userExt = extensions.get(userId)
        picturesToFetch.push(
            fs.promises.readFile(`${base_path}${userId}/avatar.${userExt}`).catch(onRejected)
        ) 
    })

    profilePicturesBuffer = await Promise.all(picturesToFetch)
    profilePicturesBuffer.forEach(buffer => {
        profilePictures.push(buffer.toString('base64'))
    })

    return profilePictures
}