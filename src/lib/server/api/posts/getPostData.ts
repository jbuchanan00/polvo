


export const getPostData = async (postId: number | string): Promise<Post> => {
    let post
    try{
        const res = await fetch(`http://localhost:5175/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })


        if(!res.ok){
            throw new Error(`Failed to fetch post of id: ${postId}`)
        }

        post = await res.json()
    }catch(e){
        console.log(`ERROR, SETTING DEFAULT`)
    }

    post = {id: postId, description: 'This is a quick temporary description for tattoos #test', image: 'null', date: new Date()} 

    return post
}