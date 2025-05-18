<script lang='ts'>
    import ProfileInfoCard from "$lib/components/profileInfoCard.svelte";
    import ProfileImageCard from "$lib/components/profileImageCard.svelte";
    import { onMount } from 'svelte'
    import { loadRemoteNavbars } from "$lib/handleRemotes/remoteNavbars";
    import ProfilePostCard from "$lib/components/profilePostCard.svelte"

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

<div>
    <div id="top-nav"></div>
    <div class="topSection">
        <ProfileImageCard />
        <ProfileInfoCard/>
    </div>
    <div class="diagonalElement"></div>
    <div class="bodySection">
        <ProfilePostCard likes=0 liked={false}/>
        <ProfilePostCard likes=2 liked={true}/>
        <ProfilePostCard likes=25 liked={true}/>
        <ProfilePostCard likes=2500 liked={false}/>
        <ProfilePostCard likes=2500000 liked={true}/>
        <ProfilePostCard likes=999 liked={true}/>
        <ProfilePostCard likes=0 liked={false}/>
        <ProfilePostCard likes=2 liked={true}/>
        <ProfilePostCard likes=25 liked={true}/>
        <ProfilePostCard likes=2500 liked={false}/>
        <ProfilePostCard likes=2500000 liked={true}/>
        <ProfilePostCard likes=999 liked={true}/>
        <ProfilePostCard likes=0 liked={false}/>
        <ProfilePostCard likes=2 liked={true}/>
    </div>
    <div id="bottom-nav"></div>
</div>

<style>
    #top-nav {
        width: 100%;
        position: sticky;
        margin-top: -10px;
        z-index: 1;
    }
    .diagonalElement {
        border: 2px solid #000;
        transform: rotate(16deg) translate(-40%, 100px);
        margin-top: 50px;
        margin-right: 150px;
        z-index: -100;
        width: 250%;
        position: absolute;
        background-color: #ffb2ef;
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