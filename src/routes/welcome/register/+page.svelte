<script>
	import RegisterForm from '$lib/components/RegisterForm.svelte';
</script>

<div class="totalContainer">
	<div class="formContainer">
		<RegisterForm actionCommand='register'/>
	</div>
</div>

<style>
	.formContainer {
		padding-top: 10px;
		margin-top: 75px;
	}
</style>
