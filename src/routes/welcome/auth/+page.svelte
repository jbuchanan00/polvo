<script lang="ts">
    import RegisterForm from "$lib/components/RegisterForm.svelte";
    import LoginForm from "$lib/components/LoginForm.svelte";
    import { goto } from '$app/navigation'
	import { onMount } from "svelte";
    import {base} from '$app/paths'

    let mode = $state('login')

    const {data} = $props()
    const {status: authStatus} = data

    onMount(() => {
        if(authStatus === 'success'){
            goto('/')
        }
    })

    function modeSwitch(type: string) {
        mode = type;
    }

</script>

<div class="authContainer">
    <div class="headingContainer">
        <div class="logoContainer">
            <img src={`${base}/icon/square-logo.png`} alt="square-logo" class="logo"/>
        </div>
        <div class="titleContainer">
            <h1>INKED OUT</h1>
        </div>
        <div class="subtitleContainer">
            {#if mode === 'login'}
            <h3>WELCOME BACK</h3>
            {:else}
            <h3>JOIN THE FUN</h3>
            {/if}
        </div>
    </div>
    <div class="modeSwitchContainer">
        <div class="buttonsContainer">
            <button type="button" class:activeButton={mode === 'login'} class:inactiveButton={mode !== 'login'} class="loginButton" onclick={() => modeSwitch('login')}>LOGIN</button>
            <button type="button" class:activeButton={mode === 'register'} class:inactiveButton={mode !== 'register'} onclick={() => modeSwitch('register')}>REGISTER</button>
        </div>
    </div>
    <div class="oauthContainer">
        <a class="googleContainer" href={`${base}/auth/google`}>
            <img src={`${base}/icon/mail-icon.svg`} alt="mail" /> CONTINUE WITH GOOGLE
        </a>
    </div>
    <div class="containerSplit">
        <div class="split"></div>   OR   <div class="split"></div>
    </div>
    <div class="nativeFormContainer">
        {#if mode === 'login'}
        <LoginForm />
        {:else if mode === 'register'}
        <RegisterForm />
        {/if}
    </div>
</div>

<style>
    .split {
        width: 110px;
        height: 3px;
        background-color: black;
    }
    .containerSplit {
        margin-top: 10px;
        display: flex;
        width: 280px;
        justify-content: space-around;
        align-items: center;
        font-size: small;
        font-weight: bolder;
    }
    .oauthContainer {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .googleContainer {
        width: 280px;
        display: flex;
        padding-left: 5px;
        border: 3px solid #000;
        box-shadow: 3px 3px black;
        border-radius: 5px;
        padding: 5px;
        justify-content: space-around;
        align-items: center;
        font-size: small;
        background-color: #ef4444;
        color: white;
        font-weight: bolder;
    }
    .googleContainer img {
        -webkit-filter: invert(1);
        filter: invert(1)
    }
    .loginButton {
        border-right: 3px solid black;
    }
    .activeButton {
        background-color: #f472b6;
        color: white;
    }
    .inactiveButton {
        background-color: white;
        color: black
    }
    .modeSwitchContainer {
        display: flex;
        justify-content: center;
    }
    .buttonsContainer {
        border: 3px solid #000;
        display: flex;
        font-size: small;
        height: 30px;
        font-weight: bolder;
        width: 280px;
    }
    .buttonsContainer button {
        width: 50%;
    }
    .titleContainer {
        font-weight: bolder;
        margin-top: 10px;
    }
    .subtitleContainer {
        color: grey;
        font-size: small;
    }
    .headingContainer {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .authContainer {
        width: 375px;
        background-color: white;
        border: 5px solid black;
        box-shadow: 5px 5px black;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .logo {
        width: 50px;
        border: 3px solid black;
        box-shadow: 3px 3px black;
    }
</style>