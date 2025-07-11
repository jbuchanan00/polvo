<script lang='ts'>
    import ProfileInfoCard from "$lib/components/profileInfoCard.svelte";
    import ProfileImageCard from "$lib/components/profileImageCard.svelte";
    import editGear from "$lib/assets/svg/editGear.svg"
    import { onMount } from 'svelte'
    import ProfilePostCard from "$lib/components/profilePostCard.svelte";
    import PostModal from "$lib/components/PostModal.svelte";
    import testPic from '$lib/assets/photos/testProf.jpg'
    import { postModalState } from "$lib/stores/ui";
	import type { PageData } from "./$types";

    let focusedPost = $state()
    let image = $state('')
    let post = $state()

    const { data: userData } = $props<{data: PageData}>();

    const handlePostClick = async (postId: number, imageUrl: string) => {
        focusedPost = postId
        image = imageUrl
        const call = await fetch(`/?id=${focusedPost}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        post = await call.json()
        $postModalState.open = true;
    }

    const handlePostExit = () => {
        $postModalState.open = false
        focusedPost = null
    }
    
    

    onMount(async () => {
        try {
            $postModalState.open= false
        }catch(e){
            console.error(`Failed to load remote navbars`, e)
        }
    })

</script>

<div class="pageContainer">
    {#if $postModalState.open}
        <div><PostModal postId={focusedPost} postImage={image} postExit={handlePostExit} user={userData} postInfo={post}/></div>
    {/if}
    <div class="profileEditContainer"><a href="/edit"><img src={editGear} alt="edit" /></a></div>
    <div class="topSection">
        <ProfileImageCard profilePic={testPic}/>
        <ProfileInfoCard {userData}/>
    </div>
    
    
    <div class="bodySection">
        <ProfilePostCard likes=0 liked={false} postId={1} seePost={handlePostClick}/>
        <ProfilePostCard likes=2 liked={true} postId={2} seePost={handlePostClick}/>
        <ProfilePostCard likes=25 liked={true} postId={3} seePost={handlePostClick}/>
        <ProfilePostCard likes=2500 liked={false} postId={4} seePost={handlePostClick}/>
        <ProfilePostCard likes=2500000 liked={true} postId={5} seePost={handlePostClick}/>
        <ProfilePostCard likes=999 liked={true} postId={6} seePost={handlePostClick}/>
        <ProfilePostCard likes=0 liked={false} postId={7} seePost={handlePostClick}/>
        <ProfilePostCard likes=2 liked={true} postId={8} seePost={handlePostClick}/>
        <ProfilePostCard likes=25 liked={true} postId={9} seePost={handlePostClick}/>
        <ProfilePostCard likes=2500 liked={false} postId={10} seePost={handlePostClick}/>
        <ProfilePostCard likes=2500000 liked={true} postId={11} seePost={handlePostClick}/>
        <ProfilePostCard likes=999 liked={true} postId={12} seePost={handlePostClick}/>
        <ProfilePostCard likes=0 liked={false} postId={13} seePost={handlePostClick}/>
        <ProfilePostCard likes=2 liked={true} postId={14} seePost={handlePostClick}/>
    </div>
</div>

<style>
    .profileEditContainer {
        position: absolute;
        margin: 5px;
        padding: 5px;
    }
    .pageContainer {
        padding-bottom: 60px;
    }
    .bodySection {
        z-index: 1;
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .topSection {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-top: 30px;
        padding: 0px 20px;
    }
</style>