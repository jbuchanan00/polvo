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
    #password {
        background: url('../lock-icon.svg') no-repeat scroll 0px 0px;
        padding-left: 25px;
    }
    #email {
        background: url('../mail-icon.svg') no-repeat scroll 0px 0px;
        padding-left: 25px;
    }
    .input {
        background-color: #cffafe;
        border: 3px solid black;
        box-shadow: 3px 3px black;
        border-radius: 5px;
    }
    input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #cffafe inset !important;
        -webkit-text-fill-color: #000 !important;
        transition: background-color 5000s ease-in-out 0s;
    }
</style>