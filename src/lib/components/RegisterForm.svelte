<script lang="ts">
	import { enhance } from '$app/forms';

    let debounceTimeout: any;

    let {form} = $props()

    console.log(form)

    let firstInput = $state()
    let secondInput = $state()
    let doesntMatch = $state(false)

    function handleInput(){

        clearTimeout(debounceTimeout)

        debounceTimeout = setTimeout(() => {
        if(firstInput === secondInput){
            doesntMatch = false
        }else{
            doesntMatch = true
        }
    }, 500)
    }

    
</script>

<div class="registerContainer">
    
	<form method='POST' use:enhance action='?/register'>
        {#if form?.error}
        {console.log(form)}
            <p style={"color: red;"}>Error: {form.error}!</p>
        {/if}
		<div class="emailContainer">
            <div class="inputHeader">
                <label for="fullname">FULL NAME</label>
            </div>
            <div class="input">
                <input type="text" name="fullname" required id="fullname"/>
            </div>
        </div>
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
                <input bind:value={firstInput} type="password" name="password" pattern={".{8,}"} title="Password must be at least 8 characters" required id="password"/>
            </div>
        </div>
		<div class="passwordConfirmContainer">
            <div class="inputHeader">
                <label for="passwordConfirm">CONFIRM PASSWORD</label>
            </div>
            <div class="input">
                <input bind:value={secondInput} class:doesntMatch = {doesntMatch} type="password" name="passwordConfirm" oninput={() => handleInput()} required id="password"/>
                {#if doesntMatch}
                    <p>Passwords don't match</p>
                {/if}
            </div>
        </div>
        <div class="buttonContainer">
            <button type="submit">REGISTER NOW!</button>
            <a href='/'>FORGOT PASSWORD?</a>
        </div>
    </form>
</div>

<style>
    label {
        font-size: .75em;
    }
    input:focus {
        outline: none;
    }
    input {
        border: none;
        height: 25px;
    }
	.buttonContainer {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .buttonContainer button:active {
        transform: translateX(3px) translateY(3px);
        box-shadow: none;
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
        font-weight: 900;
    }
    .buttonContainer a {
        margin: 20px;
        font-size: 0.6em;
        color: grey;
    }
	#fullname {
		background: url('../person-icon.svg') no-repeat scroll 4px 4px;
        padding-left: 25px;
        width: 100%;
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
    .doesntMatch {
        border: 3px solid red;
    }
    .registerContainer {
        font-weight: bolder;
    }
</style>
