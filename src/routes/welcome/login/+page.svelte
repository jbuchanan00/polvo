<script lang="ts">
	import { enhance } from '$app/forms';
	import appleIcon from '../../../lib/assets/icons/apple-logo-svgrepo-com.svg';
	import googleIcon from '../../../lib/assets/icons/google-svgrepo-com.svg';
	import tiktokIcon from '../../../lib/assets/icons/tiktok-svgrepo-com.svg';
	import instagramIcon from '../../../lib/assets/svg/instagram-svgrepo-com.svg';
	import Arrow from '../../../lib/components/LinkButton.svelte';

	export let form: App.PageData;
	
</script>

<div class="totalContainer">
	<div class="container">
		<div class="form_area">
			<p class="title">LOGIN</p>
			{#if form?.message }
				<p>Incorrect Login</p>
			{/if}
			<form method="POST" use:enhance>
				<div class="form_group_all">
					<div class="form_group">
						<label class="sub_title" for="email">Email</label>
						<input
							placeholder="Enter your email"
							id="email"
							class="form_style"
							type="email"
							name="email"
						/>
					</div>
					<div class="form_group">
						<label class="sub_title" for="password">Password</label>
						<input
							placeholder="Enter your password"
							id="password"
							class="form_style"
							type="password"
							name="password"
						/>
					</div>
				</div>
				<div class="login">
					<button class="btn" type="submit">LOGIN</button>
					<p>Don't Have an Account?</p>
					<a class="link" href="./register"><Arrow actionText='register' text="register" /></a>
				</div>
				<div class="linkContainer">
					<a class="link" href="/"><img src={appleIcon} alt="appleicon" /></a>
					<button class="oauthIcon" name="action" value="googleOAuth"><img src={googleIcon} alt="googleicon" /></button>
					<a class="link" href="/"><img src={tiktokIcon} alt="tiktokicon" /></a>
					<a class="link" href="/"><img src={instagramIcon} alt="instagramicon" /></a>
				</div>
			</form>
		</div>
		<a class="link" href="/">Go Back</a>
	</div>
</div>

<style>
	input {
		background-color: #DAF5F0;
	}
	.form_group_all {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.totalContainer {
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}
	.login .link {
		width: 100%;
		padding: 20px;
	}
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.linkContainer {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
		.oauthIcon {
		width: 50%;
		display: flex;
		justify-content: center;
	}
	.oauthIcon img {
		width: 30%;
	}
	.link img {
		width: 30%;
	}
	.link {
		width: 50%;
		display: flex;
		justify-content: center;
	}
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		width: 95%;
	}

	.form_area {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #eddcd9;
		height: auto;
		width: auto;
		border: 2px solid #264143;
		border-radius: 20px;
		box-shadow: 3px 4px 0px 1px #e99f4c;
	}

	.title {
		color: #264143;
		font-weight: 900;
		font-size: 1.5em;
		margin-top: 20px;
	}

	.sub_title {
		font-weight: 600;
		margin: 5px 0;
	}

	.form_group {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		margin: 10px;
	}

	.form_style {
		outline: none;
		border: 2px solid #264143;
		box-shadow: 3px 4px 0px 1px #e99f4c;
		width: 290px;
		padding: 12px 10px;
		border-radius: 4px;
		font-size: 15px;
	}

	.form_style:focus,
	.btn:focus {
		transform: translateY(4px);
		box-shadow: 1px 2px 0px 0px #e99f4c;
	}

	.btn {
		padding: 15px;
		margin: 25px 0px;
		width: 290px;
		font-size: 15px;
		background: #de5499;
		border-radius: 10px;
		font-weight: 800;
		box-shadow: 3px 3px 0px 0px #e99f4c;
	}

	.btn:hover {
		opacity: 0.9;
	}

	.link {
		font-weight: 800;
		color: #264143;
		padding: 5px;
	}
</style>
