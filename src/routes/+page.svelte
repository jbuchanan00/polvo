<script lang='ts'>
    import ProfileInfoCard from "$lib/components/profileInfoCard.svelte";
    import ProfileImageCard from "$lib/components/profileImageCard.svelte";
    import { onMount } from 'svelte'
    import { loadRemoteNavbars } from "$lib/handleRemotes/remoteNavbars";
    import ProfilePostCard from "$lib/components/profilePostCard.svelte";
    import PostModal from "$lib/components/PostModal.svelte";
    import testPic from '$lib/assets/photos/testProf.jpg'
	import type { PageData } from "./$types";

    let modalUp = $state(false)
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
        modalUp = true;
    }

    const handlePostExit = () => {
        modalUp = false
        focusedPost = null
    }
    
    

    onMount(async () => {
        try {
            if(document){
                const topNavElement = document.getElementById('top-nav')
                const bottomNavElement = document.getElementById('bottom-nav')
                const remote = await loadRemoteNavbars()
                if(topNavElement) remote.TopNavInstance(topNavElement)
                if(bottomNavElement) remote.BottomNavInstance(bottomNavElement)
            }
        }catch(e){
            console.error(`Failed to load remote navbars`, e)
        }
    })

</script>

<div class="pageContainer">
    <div id="top-nav" class:top-nav-show={modalUp} ></div>
    {#if modalUp}
        <div><PostModal postId={focusedPost} postImage={image} postExit={handlePostExit} user={userData} postInfo={post}/></div>
    {/if}
    <div class="topSection">
        <ProfileImageCard profilePic={testPic}/>
        <ProfileInfoCard {userData}/>
    </div>
    <div class="diagonalElement"></div>
    
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
    <div id="bottom-nav"></div>
</div>

<style>
    #top-nav {
        width: 100%;
        margin-top: -10px;
        z-index: 100;
        background-color: beige;
        padding-bottom: 5px;
        border-bottom: 2px solid black;
        height: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .top-nav-show {
        position: fixed;
        top: 0;
    }
    #bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        z-index: 1000;
        background-color: beige;
    }
    .pageContainer {
        padding-bottom: 60px;
    }
    .diagonalElement {
        border: 2px solid #000;
        transform: rotate(16deg) translate(-40%, 50px);
        margin-top: 50px;
        margin-right: 150px;
        z-index: -100;
        width: 250%;
        position: absolute;
        background-color: #DAF5F0;
        height: 100%;
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