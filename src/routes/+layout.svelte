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
                if(topNavElement) remote.TopNavInstance(topNavElement, {assetBase: "http://localhost:5175/"})
                if(bottomNavElement) remote.BottomNavInstance(bottomNavElement, {assetBase: "http://localhost:5175/"})
            }
        }catch(e){
            console.error(`Failed to load remote navbars`, e)
        }
    })


</script>


<div id="top-nav" class:top-nav-show = {$postModalState.open} ></div>
<div id="body">
    {@render children()}
</div>
<div id="behind-bottom-nav"></div>
<div id="bottom-nav"></div>



<style>
    #body {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 375px;
    }
	#top-nav {
        width: 100%;
        z-index: 100;
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
        height: 75px;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #behind-bottom-nav {
        height: 60px;
    }
</style>
