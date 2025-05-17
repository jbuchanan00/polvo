<script>
    import { enhance } from "$app/forms";
</script>

<div>
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
		align-items: center;
	}
	.totalContainer {
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