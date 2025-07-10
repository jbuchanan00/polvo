<script lang="ts">
    import { enhance } from "$app/forms";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";

	export let data: PageData
	let ReactComp: any

	const {user: userData} = data

	onMount(async () => {
		// @ts-ignore
		await import('http://localhost:5176/dist/autofill-location')
		
	})


</script>

<div class="formContainer">
    <form method="POST" use:enhance action='?/submitEdit'>
        <div class="form_group_all">
			<div class="exitLink"><a href="/" >X</a></div>
            <div class="form_group">
                <label class="sub_title" for="displayname">DISPLAY NAME</label>
                <input placeholder="Enter your desired display name" class="form_style" type="text" name="display_name" defaultValue={userData.username}/>
            </div>
			<div class="form_group">
                <label class="sub_title" for="given_name">GIVEN NAME (optional)</label>
                <input placeholder="Enter your given name" class="form_style" type="text" name="given_name" defaultValue={userData.name}/>
            </div>
			<div class="form_group">
                <label class="sub_title" for="bio">BIO</label>
                <textarea
                    placeholder="Enter bio"
                    id="bio"
                    class="form_style"
                    name="bio"
                ></textarea>
            </div>
            <div class="form_group">
                <label class="sub_title" for="location">LOCATION</label>
                <autofill-location></autofill-location>
            </div>
        </div>
        <button class="btn" type='submit' name="action" value="submit">SAVE</button>
    </form>
</div>

<style>
	.exitLink {
		position: absolute;
		top: 0;
		right: 0;
		margin: 25px;
	}
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	input {
		background-color: #DAF5F0;
	}
	textarea {
		background-color: #DAF5F0;
	}
	.formContainer {
		border: 2px solid #000;
		margin: 10px;
		display: flex;
		justify-content: center;
		align-content: center;
		background-color: #eddcd9;
		border-radius: 20px;
		box-shadow: 5px 5px #e99f4c;
	}
	.form_group_all {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 100%;
	}

	.sub_title {
		font-weight: 600;
		margin: 5px 0;
	}

	.form_group {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
		width: 100%;
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
</style>