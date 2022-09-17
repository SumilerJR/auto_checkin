<template>
	<!-- 按钮区域 -->
	<div class="ballSwitch">
		<span class="off" ref='off' @click='switchFlag = false'>{{offMsg}}</span>
		<div class="button" @click='switchFlag = !switchFlag'>
			<div class="ball" ref='ball'></div>
		</div>
		<span class="on" ref='on' @click='switchFlag = true'>{{onMsg}}</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				offMsg: "Sign In",
				onMsg: "Sign Up",
				switchFlag: false,
			};
		},
		watch: {
			switchFlag(value) {
				// this.switchFlag = !this.switchFlag;
				this.$bus.$emit("getSwitchFlag", this.switchFlag);
				// 用操作标签元素的方式修改样式
				if (this.switchFlag) {
					this.$refs.ball.style.left = 61 + "%";
					this.$refs.on.style.opacity = 1;
					this.$refs.off.style.opacity = 0.5;
				} else {
					this.$refs.ball.style.left = 0 + "%";
					this.$refs.on.style.opacity = 0.5;
					this.$refs.off.style.opacity = 1;
				}
			},
		},
	};
</script>

<style scoped>
.ballSwitch {
	width: 500px;
	display: flex;
	cursor: pointer;
	justify-content: space-evenly;
}

.off,
.on {
	color: #fff;
	transition: 0.5s;
	font: 300 20px "";
}

.on {
	opacity: 0.5;
}

.button {
	width: 60px;
	height: 25px;
	background-color: rgb(255, 235, 167);
	border-radius: 20px;
	position: relative;
}

.ball {
	position: absolute;
	width: 25px;
	height: 25px;
	background-color: rgb(25, 45, 56);
	border-radius: 50%;
	transition: 0.5s;
	box-shadow: 0 0 10px #000;
	left: 0;
	/* 往左一点点，完全贴合 */
	transform: translate(-1px);
}
</style>