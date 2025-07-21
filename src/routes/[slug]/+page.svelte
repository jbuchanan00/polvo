<script lang='ts'>
    import ProfileInfoCard from "$lib/components/profileInfoCard.svelte";
    import ProfileImageCard from "$lib/components/profileImageCard.svelte";
    import editGear from "$lib/assets/svg/editGear.svg"
    import ProfilePostCard from "$lib/components/profilePostCard.svelte";
    import testPic from '$lib/assets/photos/testProf.jpg'
	import type { PageData } from "./$types";

    let focusedPost = $state()
    let image = $state('')
    let post = $state()

    const { data } = $props<{data: PageData}>();
    const {user: userData} = data
</script>

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
                    <img src="icon/earth-icon.svg" alt="location" /><h4>{userData.location}</h4>
                    {:else}
                    <img src="icon/earth-icon.svg" alt="location" /><h4>Planet Earth</h4>
                    {/if}
                </div>
            </div>
        </div>
        <div class="numericInfo">
            <div class="followers">

            </div>
            <div class="following">

            </div>
        </div>
        <div class="bio">

        </div>
        <div class="button">
            <div class="editButton">

            </div>
            <div class="messageButton">

            </div>
        </div>
    </div>
    <div class="postTypeSwitch">
        <div class="postsTab">

        </div>
        <div class="taggedTab">

        </div>
    </div>
    <div class="post">
        <div class="postPicture">

        </div>
    </div>
</div>

<style>
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
    }
    .heading {
        background-color: #f472b6;
        padding: 10px;
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
    }
</style>