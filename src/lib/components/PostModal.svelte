<script>
    let {postId, postExit, postImage, user, postInfo} = $props()

    console.log('COMPARE IDS', postId, postInfo.id)

</script>

<div class="modalContainer">
    <div class="modal">
        <button onclick={postExit}>X</button>
        <div class="postContainer">
            <div class="imageContainer">
                <img src={postImage} alt="post" />
            </div>
            <div class="infoContainer">
                <h3>{user.user.username}</h3>
                <p>{postInfo.description}</p>
            </div>
        </div>
    </div>
</div>

<style>
    p {
        font-size: .75em;
    }
    h3 {
        font-weight: bolder;
    }
    .infoContainer {
        margin-top: 10px;
        width: 85%;
    }
    .postContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
    }
    .imageContainer {
        width: 85%;
        padding-bottom: 20px;
        border-bottom: 5px solid black;
    }
    .postContainer img {
        width: 100%;
        border-radius: 5px;
        border: 2px solid #000;
        transform: rotate(-2deg);
        box-shadow: 5px 5px;
    }
    button {
        margin: 5px;
        position: fixed;
        width: 20%;
        right: 0;
    }
    .modal {
        background-color: #ff6b6b;
        width: 90%;
        height: 90%;
        border-radius: 10px;
        border: 2px solid black;
        overflow-y: auto;
    }
    .modalContainer {
        position: fixed;
        z-index: 50;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }
</style>