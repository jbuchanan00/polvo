<script lang="ts">
    const {locations} = $props()

</script>

<div class="listContainer">
    {#each locations as location}
        <div class="locationContainer">
            {location.city}, {location.state}
        </div>
    {/each}
</div>

<style>

</style>