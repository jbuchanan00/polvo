<script lang="ts">
	import { onMount } from "svelte";

    const {userData} = $props();
    console.log(userData)
    let locationStr = $state();

    onMount(() => {
        locationStr = userData.user?.location === null ? '' : `${userData.user.location.name} ${userData.user.location.state}`
    })

</script>

<div class="infoSection">
    {#if userData.user?.username}
        <h1>{userData.user.username}</h1>
        <h3>{userData.user.name}</h3>
    {:else}
        <h3>{userData.user?.first_name} {userData.user?.last_name}</h3>
    {/if}
    {#if userData.user?.role_id === 1}
        <h5>Canvas</h5>
    {:else if userData.user?.role === 2}
        <h5>Tattooer</h5>
    {/if}
    {#if locationStr}
        <h5>{locationStr}</h5>
    {:else}
        <h5>Planet Earth</h5>
    {/if}
    <h5>Contact Link</h5>
</div>

<style>
    h1 {
        font-weight: bolder;
        font-size: 1.25em;
    }
    h5 {
        font-weight: lighter;
        font-size: .75em;
    }
    .infoSection {
        background-color: #FDFD96;
        padding: 10px;
        width: 55%;
        border-radius: 5px;
        /* box-shadow: 10px -10px #FFA07A, -10px 10px #FF6B6B; */
        border: 3px solid #000;
        margin-top: 30px;
    }
</style>