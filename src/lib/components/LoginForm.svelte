<script lang="ts">
	import { enhance } from "$app/forms";


</script>

<div class="loginContainer">
    <form method='POST' use:enhance >
        <div class="emailContainer">
            <div class="inputHeader">
                <label for="email">EMAIL</label>
            </div>
            <div class="input">
                <input type="email" name="email" required id="email"/>
            </div>
        </div>
        <div class="passwordContainer">
            <div class="inputHeader">
                <label for="password">PASSWORD</label>
            </div>
            <div class="input">
                <input type="password" name="password" required id="password"/>
            </div>
        </div>
        <div class="buttonContainer">
            <button type="submit">LOGIN NOW!</button>
            <a href='/'>FORGOT PASSWORD?</a>
        </div>
    </form>
</div>

<style>
    .buttonContainer {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .buttonContainer button {
        width: 280px;
        background-color: #22c55e;
        color: white;
        font-size: small;
        padding: 5px;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        border-radius: 5px;
    }
    .buttonContainer a {
        margin: 20px;
        font-size: 0.6em;
        color: grey;
    }
    #password {
        background: url('../lock-icon.svg') no-repeat scroll 4px 4px;
        padding-left: 25px;
        width: 100%;
    }
    #email {
        background: url('../mail-icon.svg') no-repeat scroll 0px 0px;
        padding-left: 25px;
        width: 100%;
    }
    .input {
        background-color: #cffafe;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        border-radius: 5px;
    }
    .loginContainer {
        font-weight: bolder;
    }
</style>