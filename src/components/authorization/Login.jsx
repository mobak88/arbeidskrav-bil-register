import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {

const navigate = useNavigate();
const [values, setValues] = useState({
	username: "",
	pass: "",
	showPass: false,
});

const handleSubmit = (e) => {
	e.preventDefault();
	axios.post('/menu', {
			username: values.username,
			password: values.pass,
		})
		.then((res) => {
			localStorage.setItem("token", res.data.token);
            navigate("/menu")
		})
		.catch((err) => console.error(err));
};

	return (
		
<section className="login-container">


<form onSubmit={handleSubmit}>
        <label> Username</label>
		<input
			type="username"
			label="Enter your username"
			placeholder="username"
			required
			onChange={(e) => setValues({ ...values, username: e.target.value })}
		/>
    <label>Password</label>
	<input
		type={values.showPass ? "text" : "password"}
		label="Password"
		placeholder="Password"
		required
		onChange={(e) => setValues({ ...values, pass: e.target.value })}

	/>
	<button className="btn">
		Sign In
	</button>
    </form>

</section>
		
	);
};

export default Login;