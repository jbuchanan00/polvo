<script>
    import { tempProfile } from "$lib/icon";
</script>

<div class="profileContainer">
    <div class="imageContainer">
        <img src={tempProfile} alt="profile" />
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
        background-color: white;
        border-radius: 5px;
        transform: rotate(-10deg);
        box-shadow: 8px 8px black;
    }
    img {
        width: 100%;
        border-radius: 50%;
    }
</style>