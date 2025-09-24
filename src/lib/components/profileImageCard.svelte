<script>
    let {postPic} = $props()
</script>

    <div class="imageContainer">
        <img src={postPic} alt="profile" />
    </div>

<style>
    .imageContainer img {
        width: 100%;
        aspect-ratio: 1/1;
        border: 3px solid black;
        box-shadow: 3px 3px black;
    }
</style>