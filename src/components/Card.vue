<template>
	<div class="card" ref='card'>
		<slot name="front">卡片正面内容</slot>
		<slot name="back">卡片背面内容</slot>
	</div>
</template>

<script>
	export default {
		name: "Card",
		mounted() {
			this.$bus.$on("getSwitchFlag", (data) => {
				// console.log(this.$refs.card);
				if (data) {
					this.$refs.card.style.transform = "rotateY(180deg)";
					this.$refs.card.style.height = "520px";
				} else {
					this.$refs.card.style.transform = "rotateY(0)";
					this.$refs.card.style.height = "400px";
				}
			});
		},
	};
</script>

<style scoped>
.card {
	width: 500px;
	height: 400px;

	background-image: linear-gradient(
		259deg,
		rgb(222, 95, 95) -5%,
		rgb(53, 88, 218) 133.7%
	);

	transform-style: preserve-3d;
	/* 使元素呈现3D效果 */
	position: relative;
	transition: 0.7s;
	border-radius: 10px;
}

.card > div {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
}

.card > div h2 {
	color: #fff;
}

.card > div input {
	width: 300px;
	height: 35px;
	padding: 0 10px;
	background-color: rgb(31, 32, 41);
	color: #fff;
	border-radius: 7px;
}

.card > div button {
	width: 90px;
	height: 35px;
	color: #333;
	font-size: 15px;
	background-color: rgb(255, 235, 167);
	border-radius: 4px;
	transition: 0.3s;
	margin-bottom: 10px;
	cursor: pointer;
}

.card > div button:hover {
	/* 触摸发光布灵布灵 */
	box-shadow: 0 0 10px rgb(255, 235, 167);
}

.signIn {
	transform: translateZ(70px);
}

.signUp {
	position: absolute;
	top: 0;
	transform: translateZ(-70px) rotateY(180deg);
}
</style>