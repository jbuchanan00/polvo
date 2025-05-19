<script>
    import { enhance } from "$app/forms";
</script>

<div class="formContainer">
    <form method="POST" use:enhance>
        <div class="form_group_all">
            <div class="form_group">
                <label class="sub_title" for="displayname">DISPLAY NAME</label>
                <input placeholder="Enter your desired display name" class="form_style" type="text" name="display_name" />
            </div>
			<div class="form_group">
                <label class="sub_title" for="given_name">GIVEN NAME (optional)</label>
                <input placeholder="Enter your given name" class="form_style" type="text" name="given_name" />
            </div>
            <div class="form_group" id="options">
                <fieldset>
                    <legend class="sub_title">Role</legend>
                    <input type="radio" id="canvas" name="role" value="canvas" checked>
                    <label for="canvas">Canvas</label>
                    <input type="radio" id="artist" name="role" value="artist">
                    <label for="artist">Artist</label>
                    <input type="radio" id="shop" name="role" value="shop">
                    <label for="shop">Shop</label> 
                </fieldset>
            </div>
            <div class="form_group">
                <label class="sub_title" for="location">LOCATION</label>
                <input
                    placeholder="Enter your city, state, country"
                    id="location"
                    class="form_style"
                    type="text"
                    name="location"
                />
            </div>
        </div>
        <button class="btn" type='submit' name="action" value="submit">SAVE</button>
    </form>
</div>

<style>
	fieldset label:nth-child(3) {
		border-radius: 5px 0px 0px 5px;
	}
	fieldset label:nth-child(7) {
		border-radius: 0px 5px 5px 0px;
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
	input[type="radio"] {
		opacity:0;
		position: absolute;
	}
	input[type="radio"]:checked + label {
		background-color: #e99f4c;
	}
	fieldset label {
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 34%;
		height: 35px;
		cursor: pointer;
		background-color: #eddcd9;
		border: 2px solid #000;
	}
	fieldset label:nth-child(5) {
		border-left: 0px;
		border-right: 0px;
	}
	fieldset label:active {
		transform: translateY(1px);
	}
	#options fieldset{
		display: flex;
		position: relative;
		width: 100%;
		border-radius: 10px;
	}
	#options fieldset::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%; /* Only cover the bottom half */
		border-radius: 10px;
		box-shadow: 5px 5px #e99f4c;
		z-index: 0;
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
	#options{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 75%;
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