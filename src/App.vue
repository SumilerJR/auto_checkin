<template>
	<div id="app">
		<div class="shell">
			<BallSwitch></BallSwitch>
			<Card>
				<Login slot="front"></Login>
				<Register slot="back"></Register>
			</Card>
		</div>
	</div>
</template>

<script>
	import BallSwitch from "./components/BallSwitch.vue";
	import Card from "./components/Card.vue";
	import Login from "./components/Login.vue";
	import Register from "./components/Register.vue";

	export default {
		name: "App",
		components: { BallSwitch, Card, Login, Register },
	};
</script>

<style>
* {
	padding: 0;
	margin: 0;
	outline: none;
	border: none;
}

body {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(31, 32, 41);
}

.shell {
	/* width: 500px; */
	/* height: 550px; */
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	perspective: 1000px;
	/* background-color: #fff; */
	/* 给最外层加上一个透视，否则接下去的翻转会没有3D效果 */
}

.ballSwitch {
	margin: 40px 0;
}
</style>
