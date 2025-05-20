<script>
    import { tempProfile } from "$lib/icon";

    let {profilePic} = $props()
</script>

<div class="profileContainer">
    <div class="imageContainer">
        {#if profilePic}
            <img src={profilePic} alt="profile" />
        {:else}
            <img src={tempProfile} alt="profile" />
        {/if}
    </div>
</div>

<style>
    .profileContainer {
        width: 40%;
    }
    .imageContainer img {
        transform: rotate(10deg);
    }
    .imageContainer {
        width: 100%;
        border: 2px solid #000;
        padding: 10px;
        background-color: #FF6B6B;
        border-radius: 5px;
        transform: rotate(-10deg);
        box-shadow: 8px 8px black;
    }
    img {
        width: 100%;
        border-radius: 50%;
        border: 3px solid black;
    }
</style>