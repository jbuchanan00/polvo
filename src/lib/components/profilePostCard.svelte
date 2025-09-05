<script>
    import photo from '$lib/assets/photos/testTat.jpg'
    import {resolve} from '$app/paths'

    let {likes, liked, postId} = $props()
    let likedActive = $state(liked)

    

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
     <div class="postMedia">
         <img class="postPhoto" src={photo} alt="test" />
     </div>
     <div class="postBody">
        <div class="tags">
            <div class="tag">
                Traditional
            </div>
            <div class="tag">
                Realism
            </div>
        </div>
        <div class="artistInfo">
            <div class="artistName">
                Sarah Martinez
            </div>
            <div class="artistShop">
                Independent
            </div>
        </div>
        <div class="postFooter">
            <div class="distance">
                10mi away
            </div>
            <div class="bookmarks">
            {#if likedActive}
                <button class="bookmark" onclick={likeClick}>
                    <img class="activeBookmark" src={`${resolve('/icon/active-bookmark-icon.svg')}`} alt="likes" />
                </button>
            {:else}
                <button class="bookmark" onclick={likeClick}>
                    <img class="inactiveBookmark" src={`${resolve('/icon/bookmark-icon.svg')}`} alt="likes" />
                </button>
            {/if}
            <p>{likes}</p>
            </div>
        </div>

        
    </div>
</div>

<style>
    .bookmark img {
        width: 75%;
    }
    .bookmark {
        border: none;
        background: none;
        cursor: pointer;
    }
    .bookmarks {
        font-size: .6em;
        font-weight: 900;
        display: flex;
        width: 30px;
        justify-content: space-between;
    }
    .distance {
        font-size: .5em;
        color: #525b69;
    }
    .postFooter {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .artistInfo {
        padding-top: 5px;
    }
    .artistShop {
        color: #525b69;
        font-size: .7em;
    }
    .artistName {
        font-size: .75em;
        font-weight: 900;
        color: #6724a4;
    }
    .tags {
        display: flex;
        flex-wrap: wrap;
    }
    .tag {
        font-size: .6em;
        padding: 3px;
        border: 2px solid black;
        background-color: #fde047;
        font-weight: bolder;
        margin-right: 2px;
	}
    .postBody {
        padding:5px;
    }
    .postCard {
        width: 150px;
        background-color: white;
        border: 3px solid black;
        box-shadow: 3px 3px black;
    }
    .postPhoto {
        width: 100%;
        aspect-ratio: 1/1;
    }
</style>