import bcrypt from 'bcrypt'

const saltRounds = 10

export async function hashAndSalt(plain: string, existingSalt?: string): Promise<HashAndSalt>{
    let salt: string | number
    if(!existingSalt){
        salt = await bcrypt.genSalt(saltRounds);
    }else{
        salt = existingSalt.toString()
    }
    
    const hash = await bcrypt.hash(plain, salt);
    return {hash, salt}
}