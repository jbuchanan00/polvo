<script lang='ts'>
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { enhance } from "$app/forms";

    let status = $state('success')
    let bioHtml

    const { data } = $props<{data: PageData}>();
    if(data.status === 'fail'){
        status = 'fail'
    }
    const {user: userData, posts} = data

    let bioEdit = $state(true)
    let userBio = $state(userData.bio)

    const baseUrl = 'http://localhost:5175'
    
    function handleEdit(){
        goto(`${base}/edit`)
    }
    
    function handleMessage(){

    }

    async function handleLogout(){
        await fetch(`${base}/logout`, {
            method: 'DELETE'
        })
        goto(`${base}/welcome/auth`)
    }

    function handleBioEdit(){
        bioEdit = true;
    }

    function submitBio(){
        bioEdit = false;
    }
</script>

{#if status === 'fail'}
    <div>FAILED TO GET USER</div>
{:else}

<div class="page">
    <div class="heading">
        <div class="informational">
            <div class="profilePicture">
                <img class="profileImage" src="test/test-profile.jpg" alt="profile" />
            </div>
            <div class="personalInfo">
                <div class="name">
                    {#if userData.username}
                        <h2>{userData.username}</h2>
                    {:else if userData.first_name && userData.last_name}
                        <h2>{userData.first_name} {userData.last_name}</h2>
                    {/if}
                </div>
                <div class="roleAndLocation">
                    {#if userData.role_id === 1}
                    <img src="icon/canvas-icon.svg" alt="canvas" /><h4>Canvas</h4>
                    {:else if userData.role_id === 2}
                    <img src="icon/tattoo-gun-icon.png" alt="tattooer" /><h4>Tattooer</h4>
                    {:else}
                    <h4>{userData.role_id}</h4>
                    {/if}
                </div>
                <div class="roleAndLocation">
                    {#if userData.location}
                    <img src="icon/earth-icon.svg" alt="location" /><h4>{userData.location.name}{userData.location.state ? `, ${userData.location.state}` : ''}</h4>
                    {:else}
                    <img src="icon/earth-icon.svg" alt="location" /><h4>Planet Earth</h4>
                    {/if}
                </div>
            </div>
            <button type="button" class="logout" onclick={handleLogout}>
                <img src="icon/logout-icon.svg" alt="logout" class="logoutIcon"/>
            </button>
        </div>
        
        <div class="numericInfo">
            <div class="followersAndFollowing">
                <div class="numberBox">
                    100
                </div>
                <div class="textForNumber">
                    FOLLOWERS
                </div>
            </div>
            <div class="followersAndFollowing">
                <div class="numberBox">
                    245     
                </div>
                <div class="textForNumber">
                    FOLLOWING
                </div>
            </div>
        </div>
        {#if bioEdit}
        <div class="bioEdit">
                <form method="POST" action="?/submitBio" use:enhance={() => submitBio()}>
                    <textarea maxlength=250 rows="3" class="bioTextArea" bind:value={userBio} name="bio"></textarea>
                    <button type="submit"><img class="checkmark" src={`${base}/icon/checkmark.svg`} alt="edit bio"/></button>
                </form>
        </div>
        {:else}
        <div class="bio">
            <div class="bioText" id="showBioText">
                {userBio}
            </div>
            <div class="bioEdit">
                <button type="button" onclick={() => handleBioEdit()}><img src={`${base}/icon/edit-pencil-icon.svg`} alt="edit bio" /></button> 
            </div>
        </div>
        {/if}
        <div class="buttons">
            <div class="button" id="edit">
                <button onclick={handleEdit}>EDIT PROFILE</button>
            </div>
            <div class="button" id="message">
                <button onclick={handleMessage}>MESSAGE</button>
            </div>
        </div>
    </div>
    <div class="post">
        {#if posts.length < 1}
        <div>NO PHOTOS CURRENTLY</div>
        {:else}
            {#each posts as post}
            <div class="postPicture">
                <a href={`/${post.id}`}><img class="postImg" src={`${baseUrl}/${post.image}`} alt="post" /></a>  
            </div>
            {/each}
        
        {/if}
    </div>
</div>
{/if}

<style>
    .checkmark {
        width: 20px;
    }
    .bioTextArea {
        width: 300px;
        resize: none;
        background-color: white;
        border: 2px solid #000;
        box-shadow: 3px 3px black;
        border-radius: 5px;
    }
    .bioEdit form {
        display: flex;
        justify-content: space-between;
    }
    .bioText {
        white-space: pre-line;
    }
    .bio {
        display: flex;
        justify-content: space-between;
    }
    .logout {
        width: 30px;
        height: 30px; 
        background-color: #ef4444;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        box-shadow: 3px 3px black;
    }
    .logoutIcon {
        filter: invert(100%);
    }
    .logout:active {
        transform: translateX(3px) translateY(3px);
        box-shadow: none;
    }
    .button:active {
		transform: translateY(2px) translateX(2px);
		box-shadow: none;
	}
    .postImg {
        object-fit: contain;
        width: 100%;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        height: auto;
        aspect-ratio: 1 / 1;
        background-color: white;
    }
    .postPicture {
        width: 100%;
        margin: 5px;
    }
    .post {
        width: 100%;
        display: grid;
        background-color: #86efac;
        grid-template-columns: 30% 30% 30%;
        column-gap: 10px;
        grid-column: auto;
        border-bottom: 3px solid black;
        
    }
    #message {
        background-color: #3b82f6;
    }
    #edit {
        background-color: #22c55e;
    }
    .button {
        width: 47%;
        border: 3px solid #000;
        box-shadow: 3px 3px black;
        text-align: center;
        padding:5px;
        font-size: .9em;
        font-weight: bolder;
        color: white;
    }
    .buttons{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 10px;
    }
    .bio {
        padding-left: 5px;
        font-size: small;
        font-weight: bolder;
    }
    .textForNumber {
        font-weight: bolder;
        margin-top: 5px;
    }
    .numberBox {
        width: 100%;
        background-color: white;
        padding: 5px;
        text-align: center;
        font-weight: bolder;
        border: 3px solid black;
        box-shadow: 3px 3px black;
    }
    .followersAndFollowing {
        display: flex;
        flex-direction: column;
        height: 75%;
        justify-content: center;
    }
    .numericInfo {
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .roleAndLocation {
        font-size: small;
        font-weight: bold;
        display: flex;
    }
    .roleAndLocation img {
        width: 15px;
        margin-right: 5px;
    }
    .name {
        font-size: large;
        font-weight: bolder;
    }
    .page {
        width: 375px;
        border: 5px solid black;
        box-shadow: 5px 5px black;
        background-color: white;
        min-height: 1000px;
    }
    .heading {
        background-color: #f472b6;
        padding: 10px;
        border-bottom: 3px solid black;
    }
    .informational {
        display: flex;
    }
    .profilePicture{
        width: 50px;
        border: 3px solid black;
        box-shadow: 3px 3px black;
    }
    .personalInfo {
        margin-left: 20px;
        width: 70%;
    }
</style>