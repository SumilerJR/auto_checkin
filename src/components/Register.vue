<template>
	<div class="signUp">
		<h2>Sign Up</h2>
		<input type="text" placeholder="Nickname" v-model="signUp.nickname">
		<input type="text" placeholder="Username" v-model="signUp.username" @blur="checkUsername()">
		<input type="password" placeholder="Password" v-model="signUp.password">
		<input type="password" placeholder="Confirm Password" v-model="signUp.confirm">
		<button @click="register()">GO</button>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "Register",
		data() {
			return {
				signUp: {
					nickname: "",
					username: "",
					password: "",
					confirm: "",
				},
				isUsernameRepeat: false,
			};
		},
		methods: {
			checkUsername() {
				this.signUp.username = this.signUp.username.trim();
				axios
					.post("http://127.0.0.1:8081/api/selectUserByUsername", {
						username: this.signUp.username,
					})
					.then((response) => {
						// let data = JSON.parse(response.data);
						console.log(response.data);
						if (response.data.msg === "success") {
							if (response.data.code === 500) {
								this.isUsernameRepeat = true;
								return alert("用户名已存在！");
							} else {
								this.isUsernameRepeat = false;
							}
						} else {
							return alert("请求出错了1", error);
						}
					})
					.catch((error) => {
						return alert("请求出错了2", error);
					});
			},
			register() {
				if (this.isUsernameRepeat) {
					return alert("用户名已存在！");
				}
				let user = this.signUp;
				user.nickname = user.nickname.trim();
				user.username = user.username.trim();
				user.password = user.password.trim();
				user.confirm = user.confirm.trim();
				if (
					user.nickname === "" ||
					user.username === "" ||
					user.password === "" ||
					user.confirm === ""
				) {
					return alert("请填写注册信息");
				} else if (!/^\w+$/.test(user.password)) {
					return alert("密码只能由英文、数字和下划线组成");
				} else if (user.password != user.confirm) {
					return alert("两次密码不一样哦");
				}
				axios
					.post("http://127.0.0.1:8081/api/register", this.signUp)
					.then((response) => {
						if (response.data.msg === "success") {
							if (response.data.code === 200) {
								return alert("注册成功！");
							} else {
								return alert("注册失败！");
							}
						} else {
							return alert("请求出错了", error);
						}
					})
					.catch((error) => {
						return alert("请求出错了", error);
					});
			},
		},
	};
</script>


<style scoped>
.signUp {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
}

.signUp h2 {
	color: #fff;
}

.signUp input {
	width: 300px;
	height: 35px;
	padding: 0 10px;
	background-color: rgb(31, 32, 41);
	color: #fff;
	border-radius: 7px;
}

.signUp button {
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

.signUp button:hover {
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