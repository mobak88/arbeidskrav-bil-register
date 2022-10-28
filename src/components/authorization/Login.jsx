import { useRef, useState, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button} from 'semantic-ui-react';
import axios from 'axios';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
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
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label name="username">Username:</label>
                    <input type="text"
                     id="username" 
                     ref={userRef} autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    />
                </Form.Field>

                <Form.Field>
                    <label name="password">Password:</label>
                    <input type="text"
                     id="password"  
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    />
                </Form.Field>
                <Button> Sign In</Button>
                <Link to = "/"><Button>Cancel</Button></Link>
            </Form>
            <p> Not registred yet?
                <br />
                <Link to="/register"> Sign up</Link>
            </p>
        </section>
        )
}

export default Login;