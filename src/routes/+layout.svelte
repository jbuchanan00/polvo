<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();



</script>


<div id="body">
    {@render children()}
</div>



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
