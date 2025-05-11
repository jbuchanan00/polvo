<script>
    import ProfileInfoCard from "$lib/components/profileInfoCard.svelte";
    import ProfileImageCard from "$lib/components/profileImageCard.svelte";
    import photo from '$lib/assets/photos/testTat.jpg'
</script>

<div>
    <div class="topSection">
        <ProfileImageCard />
        <ProfileInfoCard/>
    </div>
    <div class="bodySection">
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Text</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Goes</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>In</p>
        </div>
        <div class="postCard">
            <img src={photo} alt="test" />
            <p>Here</p>
        </div>
    </div>
</div>

<style>
    p {
        font-weight: lighter;
        font-size: .75em;
    }
    .bodySection {
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .topSection {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-top: 30px;
        padding: 0px 20px;
    }
    .postCard {
        display: flex;
        flex-direction: column;
        width: 28%;
        padding: 5px 5px 20px 5px;
        border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: #ff6b6b;
        margin: 10px;
        box-shadow: 5px 5px black, -5px -5px #8669d7;
    }
    .postCard img {
        width: 90%;
        border-radius: 5px;
    }
</style>