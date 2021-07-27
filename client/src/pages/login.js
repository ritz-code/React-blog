import React, { useContext, useState } from 'react';
import Validate from '../middleware/validate';
import Axios from 'axios';
import { UserContext } from '../helpers/userContext';
import Home from './home';
import { Link } from 'react-router-dom';
import baseUrl from '../helpers/baseUrl';

/* Login page */
function Login() {

    const { loggedIn, setUsername, setLoggedIn } = useContext(UserContext);

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        username: ""
    });

    /* gets the validation error message from Validate component
       and sets the error property and the user input details */
    function handleInputChange(event) {
        const errorMsg = Validate(event);
        setError({ ...error, [event.target.name]: errorMsg });
        setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    }

    /* login user */
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const data = await Axios.post(`${baseUrl}/api/login`,
                {
                    email: e.target[0].defaultValue,
                    password: e.target[1].defaultValue,
                }
                , {
                    withCredentials: true,
                    credentials: 'include'
                }
            )
                .then((response) => {
                    setUsername(response.data.username);
                    setLoggedIn(true);
                });
        } catch (err) {
            console.log(err);
        }
    };

    /* if user is not logged in Login page is displayed, after login Home page is rendered */
    return (
        <>
            { !loggedIn ?
                (<div className="main-login-container" >
                    <div className="inner-container">
                        <div className="login-header">
                            <h1 className="heading">Login</h1>
                            <h3>Welcome back! Please log in.</h3>
                        </div>
                        <form action="/login" method="POST" className="loginform" id="loginformid" onSubmit={(e) => loginUser(e)}>
                            <div className="form-control">
                                <input
                                    type="email"
                                    className="email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                    value={userLogin.email}
                                    onChange={(e) => { handleInputChange(e) }}
                                />
                                {(error.email) && <div className="errorDiv">{error.email}</div>}
                            </div>
                            <div className="form-control">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    value={userLogin.password}
                                    onChange={(e) => { handleInputChange(e) }}
                                />
                                {(error.password) && <div className="errorDiv">{error.password}</div>}
                            </div>
                            <input type="submit" value="Login" className="btn" name="" />
                        </form>
                        <p className="loginLink">Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>

                </div>) : <Home />
            }
        </>

    )
}
export default Login;