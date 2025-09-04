import dotenv from 'dotenv'

dotenv.config()

export const getPostsByUser = async (userId: string): Promise<Post[]> => {
    try{
        const res = await fetch(`${process.env.NECTAR_URL!}/posts/${userId}`, {
            method: 'GET'
        })
        return await res.json()
    }catch(e){
        console.log('eRROR', e)
        return []
    }
    
}