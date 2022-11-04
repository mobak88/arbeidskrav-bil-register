import {React,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";



const Login = () => {
const navigate = useNavigate();

const newUsername = "admin";
const newPassword = "admin";
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');



const handleSubmit = (e) => {
	e.preventDefault();
	
	try {
		if(username === newUsername && password === newPassword ){
			navigate("/menu")
		}
	}catch (err) {
		if(!username === newUsername && !password === newPassword){
			console.log("Wrong password or username");
		} else {
			console.log("error")
		}
	}
}	
	return (
    
                <section className="login-container">
                    <h1 className="signin-title">Sign In</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="label-deco-l" htmlFor="username">Username:</label>
                        <input
							className="input-decoration"
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />

                        <label className="label-deco-l" htmlFor="password">Password:</label>
                        <input
							className="input-decoration"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button className="btn">Sign In</button>
						<Link className="login-link" to ="/">Return</Link>
                    </form>
            
                </section>
            )}

export default Login