<script lang='ts'>
    import ProfileInfoCard from "$lib/components/profileInfoCard.svelte";
    import ProfileImageCard from "$lib/components/profileImageCard.svelte";
    import photo from '$lib/assets/photos/testTat.jpg'
    import { onMount } from 'svelte'
    import { loadRemoteNavbars } from "$lib/handleRemotes/remoteNavbars";

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
        
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Text</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Goes</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>In</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Here</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Goes</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>In</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Here</p>
        </div>
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
    p {
        font-weight: lighter;
        font-size: .75em;
    }
    .bodySection {
        z-index: 1;
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .topSection {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-top: 30px;
        padding: 0px 20px;
    }
    .postCard {
        z-index: 1;
        display: flex;
        flex-direction: column;
        width: 28%;
        padding: 5px 5px 20px 5px;
        border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: #ff6b6b;
        margin: 10px;
        box-shadow: 5px 5px black, -5px -5px #8669d7;
    }
    .postCard img {
        width: 90%;
        border-radius: 5px;
    }
</style>