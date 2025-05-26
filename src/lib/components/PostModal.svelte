<script>
    let {postId, postExit, postImage} = $props()


</script>

<div class="modalContainer">
    <div class="modal">
        <button onclick={postExit}>X</button>
        <div>{postId}</div>
        <img src={postImage} alt="post" />
    </div>
</div>

<style>
    .modal {
        background-color: #ff6b6b;
        width: 90%;
        height: 90%;
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
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>