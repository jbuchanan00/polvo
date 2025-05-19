<script lang="ts">
	import menu from '../assets/icons/menu.ts';
	import logo from '../assets/icons/logo.png';
	import { profile } from '../assets/icons/portrait.ts';
</script>

<div class="totalContainer">
	<div class="iconContainer">{@html menu}</div>
	<div class="imageContainer"><img src={logo} alt="logo" /></div>
	<div class="iconContainer" id="profile">{@html profile}</div>
</div>

<style>
	.totalContainer {
		display: flex;
		background-color: #000000;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #000;
		position: fixed;
		top: 0;
		margin-bottom: -100px;
	}
	.imageContainer {
		width: 75%;
	}
	.iconContainer {
		margin: 5px;
		padding: 5px;
		transform: scale(1.2);
	}
	#profile {
		transform: scale(1.5);
	}
</style>
