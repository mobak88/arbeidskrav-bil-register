import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Login from './Login';
import axios from 'axios';
import "./register.css";

const USER_REG = /^[A-z][A-z0-9-_]{4,10}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REG_URL = 'register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [success, setSuccess] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setValidName(USER_REG.test(user));
    },[user])

    useEffect(() => {
        setValidPassword(PWD_REG.test(password));
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('')
    },[user, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        try {
            const response = await axios.post(REG_URL,
                JSON.stringify({ user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser('');
            setPassword('');
            setMatchPassword('');

        if(navigate) {
            return <Navigate to ="/menu" />;
        }
            
        } catch (err){
            if(!err?.response){
                setErrMsg('No response from server')
            } else if (err.response?.status === 409){
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Unsuccessful');
            }
            errRef.current.focus();
        }
    }
        return (
            <>
            {success ? (
				<Login />
			) : (
                <section className='register-container'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live ="assertive">{errMsg}</p>
                    <h1 className='register-title'>Welcome, register here</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
                        </label>
                        <input
                            type='text'
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby = "uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            5 to 8 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            5 to 8 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm_password">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <button className='signin-btn'>Sign Up</button> 
                    </form>
                    <p className='register-text'>
                        Already registered? <br />
                        <Link to="/Login" className='signin-link'>Sign in here</Link>
                    </p>
                </section>
            )}
        </>
        )
    } 

    export default Register