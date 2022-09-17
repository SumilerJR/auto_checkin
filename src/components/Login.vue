<template>
	<div class="signIn">
		<h2>Sign In</h2>
		<input type="text" placeholder="Username" v-model="signIn.username">
		<input type="password" placeholder="Password" v-model="signIn.password">
		<button @click="login()">GO</button>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "Login",
		data() {
			return {
				signIn: {
					username: "",
					password: "",
				},
			};
		},
		methods: {
			login() {
				if (this.signIn.username === "" || this.signIn.password === "") {
					return alert("请输入用户名和密码");
				} else if (!/^\w+$/.test(this.signIn.password)) {
					return alert("密码只能由英文、数字和下划线组成");
				}
				axios
					.post("http://127.0.0.1:8081/api/login", this.signIn)
					.then((response) => {
						// let data = JSON.parse(response.data);
						console.log(response.data);
						if (response.data.msg === "success") {
							if (response.data.code === 200) {
								return alert("登录成功！");
							} else {
								return alert("密码错误！");
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
.signIn {
	transform: translateZ(70px);
}

.signIn {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
}

.signIn h2 {
	color: #fff;
}

.signIn input {
	width: 300px;
	height: 35px;
	padding: 0 10px;
	background-color: rgb(31, 32, 41);
	color: #fff;
	border-radius: 7px;
}

.signIn button {
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

.signIn button:hover {
	/* 触摸发光布灵布灵 */
	box-shadow: 0 0 10px rgb(255, 235, 167);
}

.signIn {
	transform: translateZ(70px);
}
</style>