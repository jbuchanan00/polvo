<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { loadRemoteNavbars } from "$lib/handleRemotes/remoteNavbars";
	import { postModalState } from '$lib/stores/ui';

	let { children } = $props();


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

<div id="top-nav" class:top-nav-show = {$postModalState.open} ></div>

{@render children()}

<div id="bottom-nav"></div>


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
</style>
