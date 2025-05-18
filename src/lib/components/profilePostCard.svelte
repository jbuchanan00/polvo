<script>
    import photo from '$lib/assets/photos/testTat.jpg'
    import {likeIcon} from '$lib/icon/index'
    import {likedIcon} from '$lib/icon/index'

    let {likes, liked} = $props()
    let {likedActive} = $state(liked)

    if(likes < 1000000 && likes > 999){
        likes = likes / 1000 + 'k'
    }else if(likes > 999999){
        likes = likes / 1000000 + 'm'
    }

    const likeClick = () => {
        likedActive = !likedActive
        if(likes < 999){
            likedActive ? likes = parseInt(likes) + 1 : likes = parseInt(likes) - 1 
        }else if(parseInt(likes) === 999){
            likedActive ? likes = (parseInt(likes) + 1) / 1000 + 'k' : likes = parseInt(likes) - 1
        }else if(parseInt(likes.slice(0, -1)) === 1){
            if(!likedActive) likes = 999
        }
    }
</script>

<div class="postCard">
    <img class="postPhoto" src={photo} alt="test" />
    <div class="likeContainer">
        <p>{likes}</p>
        {#if likedActive}
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <img class="likeIcon" src={likedIcon} alt="likes" onclick={likeClick}/>
        {:else}
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <img class="likeIcon" src={likeIcon} alt="likes" onclick={likeClick}/>
        {/if}
    </div>
</div>

<style>
.postCard {
        z-index: 1;
        display: flex;
        flex-direction: column;
        width: 32%;
        padding: 5px 5px 5px 5px;
        border: 2px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin: 1px;
        margin-bottom: 4px;
        margin-right: 4px;
        background-color: #ff6b6b;
        box-shadow: 3px 3px black;
    }
    .postCard .postPhoto {
        width: 90%;
        border-radius: 5px;
        border: 2px solid #000;
        transform: rotate(-2deg);
    }
    .likeContainer {
        width: 100%;
        display: flex;
        justify-content: right;
    }
</style>