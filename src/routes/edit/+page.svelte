<script lang="ts">
    import { enhance } from "$app/forms";
	import Dropdown from "$lib/components/edit/dropdown.svelte";

	let dropdownVisible = $state(false)
	let input = $state("")
	let locations = $state([])
	const {data} = $props()
	const {user: userData} = data

	const handleLocationChange = async () => {
		if(input.length > 2){
			await fetch(`http://localhost:8081/autofill`, {
				method: "POST",
				body: JSON.stringify({
					location: input,
					baseLoc: userData.location
				})
			}).then(async (res) => {
				locations = await res.json()
				dropdownVisible = true;
				console.log(locations, dropdownVisible)
			})
		}else{
			locations = []
			dropdownVisible = false
		}
	}

	const debounce = (callback: Function, wait = 300) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), wait);
    };

};

const debounceWithLocation = debounce(() => {
	handleLocationChange();
}, 750);

</script>


<div class="pageContainer">
	<div class="backHeader">
		<div class="backButtonContainer">
			<button type="button" class="backButton"><img class="backArrow" src="/back-arrow.svg" alt="back arrow" /></button>
		</div>
		<div id="editTextContainer">
			<h3>EDIT PROFILE</h3>
		</div>
	</div>
	<div class="photoChangeContainer">
		<div class="imageContainer">
			<img class="profilePic" src="/testTat.jpg" alt="profile pic" />
		</div>
		<div class="photoButtonContainer">
			<button class="changePhotoButton">Change Photo</button>
		</div>
	</div>
	<div class="formContainer">
		<form method="POST" use:enhance action='?/submitEdit' class="form">
			<div class="itemContainer">
				<div class="inputHeading">
					<label class="sub_title" for="displayname">USERNAME</label>
				</div>
				<div class="itemInput">
					<input placeholder="Enter your desired display name" class="textInput" type="text" name="display_name" defaultValue={userData.username}/> 
				</div>
			</div>
			<div class="itemContainer">
				<div class="inputHeading">
					<label class="sub_title" for="first_name">FIRST NAME</label>
				</div>
				<div class="itemInput">
					<input placeholder="Enter your first name" class="textInput" type="text" name="first_name" defaultValue={userData.name}/>
				</div>
			</div>
			<div class="itemContainer">
				<div class="inputHeading">
					<label class="sub_title" for="last_name">LAST NAME</label>
				</div>
				<div class="itemInput">
					<input placeholder="Enter your given name" class="textInput" type="text" name="last_name" defaultValue={userData.name}/>
				</div>
			</div>
			<div class="itemContainer">
				<div class="inputHeading">
					<label class="sub_title" for="location">LOCATION</label>
				</div>
				<div class="itemInput">
					<input placeholder="Enter your location" class="textInput" type="text" name="location" defaultValue={userData.location} 
						oninput={() => {
							debounceWithLocation()
						}} 
						bind:value={input}/>
					{#if dropdownVisible}
						<Dropdown locations={locations}/>
					{/if}
				</div>
			</div>
			<div class="submitContainer">
				<button type="submit" class="submitButton">SAVE CHANGES</button>
			</div>
		</form>
	</div>
</div>

<style>
	.submitButton {
		border: 3px solid black;
		border-radius: 5px;
		padding: 5px 60px 5px 60px;
		background-color: #22c55e;
		color: white;
		font-weight: bolder;
		font-size: small;
		box-shadow: 2px 2px black;
	}
	.submitButton:active {
		transform: translateY(2px) translateX(2px);
		box-shadow: none;
	}
	.submitContainer {
		display: flex;
		justify-content: center;
		margin: 15px;
	}
	.itemContainer {
		margin-top: 15px;
		font-weight: bolder;
		font-size: small;
	}
	form {
		width: 90%;
		
	}
	input {
		background-color: white;
		border: 3px solid black;
		box-shadow: 2px 2px black;
		border-radius: 5px;
		padding: 5px;
		width: 100%;
	}
	.formContainer {
		background-color: #a5f3fc;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.changePhotoButton {
		padding: 5px 10px 5px 10px;
		border: 3px solid black;
		background-color: #3b82f6;
		box-shadow: 3px 3px black;
		margin-top: 10px;
		color: white;
		font-weight: 900;
		font-size: small;
	}
	.changePhotoButton:active {
		transform: translateY(3px) translateX(3px);
		box-shadow: none;
	}
	.profilePic {
		width: 60px;
		height: 80px;
		border: 3px solid #000;
		box-shadow: 3px 3px black;
	}
	.photoChangeContainer {
		height: 150px;
		width: 100%;
		background-color: #f9a8d4;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: 3px solid black;
	}
	.pageContainer {
		width: 375px;
		border: 5px solid black;
		box-shadow: 5px 5px black;
		background-color: white;
		height: 750px;
		letter-spacing: -1.5px;
		cursor: default;
	}
	.pageContainer button {
		cursor: pointer;
	}
	.backButtonContainer{
		height: 60px;
		width: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.backHeader button:active {
		transform: translateY(3px) translateX(3px);
		box-shadow: none;
	}
	.backHeader {
		display: flex;
		height: 60px;
		background-color: #c084fc;
		border-bottom: 3px solid black;
	}
	.backArrow {
		width: 25px;
	}
	.backHeader button {
		background-color: white;
		padding: 5px;
		width: 30px;
		height: 30px;
		border: 3px solid black;
		box-shadow: 3px 3px black;
	}
	.backHeader h3 {
		margin-left: 10px;
		font-weight: 900;
	}
	#editTextContainer {
		display: flex;
		align-items: center;
	}
</style>
