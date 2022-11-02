import { useRef, useState, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";



const LOGIN_URL = '/login';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    },[]);

    useEffect(() => {
        setErrMsg('')
    },[user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, password}),
            {   headers: {'Content-Type': 'application/json' },
                withCredentials: true    
            }
        );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, password, roles, accessToken});
            setUser('');
            setPassword('')
            setSuccess(true);
            navigate(from, { replace: true});
        } catch (err) {
            if(!err?.response){
                setErrMsg('No response from Server');
            } else if(err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            } else if(err.response?.status === 401){
                setErrMsg('Unathorized access');
            } else {
                setErrMsg('Login failed');
            }
                errRef.current.focus();
        }
    }
        return (
            <> 
            {success? (
                <section>
                <h1> You are logged in!</h1>
                <br />
                <p>
                    <Link to="/createPerson">Go to homepage</Link>
                </p>
                </section>
            ): (
        <section className='login-container'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>

                    <label name="username">Username:</label>
                    <input type="text"
                     id="username" 
                     ref={userRef} autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    />
            
                
                    <label name="password">Password:</label>
                    <input type="password"
                     id="password"  
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    />
                <button className='btn sign-in'> Sign In</button>
                <Link to = "/"><button className='btn cancel'>Cancel</button></Link>
            </form>
            <p> Not registred yet?
                <br />
                <Link to="/register"> Sign up</Link>
            </p>
        </section>
            )}
        </>
        )
}

export default Login;