<script lang="ts">
    const {locations} = $props()
</script>

<div class="listContainer">
    {#each locations as location}
        <div class="locationContainer">
            {location.name}, {location.state}
        </div>
    {/each}
</div>

<style>
    .listContainer {
        background-color: white;
        width: 100%;
    }
</style>