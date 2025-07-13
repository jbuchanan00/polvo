<script lang="ts">
    const {locations, handling} = $props()
</script>

<div class="listContainer">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    {#each locations as location}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="locationContainer" >
            <button class="locationButton" type="button" onclick={(e) => handling(e)} value={JSON.stringify(location)}>
                {location.name}{location.state ? `, ${location.state}` : ''}
            </button>
        </div>
    {/each}
</div>

<style>
    .listContainer {
        background-color: white;
        width: 290px;
        border: 3px solid black;
        box-shadow: 5px 5px black;
        position: fixed;
        margin-top: 5px;
    }
    .locationContainer {
        height: 40px;
        padding-left: 10px;
        padding-top: 10px;
        border-bottom: 2px solid black;
    }
    .locationContainer:active {
        box-shadow: none;
        background-color: green;
        color: white;
    }
</style>