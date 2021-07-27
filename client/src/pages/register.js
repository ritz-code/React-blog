import React, { useState } from 'react';
import Validate from '../middleware/validate';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import baseUrl from '../helpers/baseUrl';

/* Sign up function */
function Register() {

    const [userRegister, setUserRegister] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [userCreated, setUserCreated] = useState('');

    /* gets the validation error message from Validate component
       and sets the error property and the user input details */
    function handleInputChange(event) {
        const errorMsg = Validate(event);
        setError({ ...error, [event.target.name]: errorMsg });
        setUserRegister({ ...userRegister, [event.target.name]: event.target.value });
    }

    /* Capitalizes the first letter of name and POSTs the user data */
    const registerUser = async (e) => {
        e.preventDefault();
        let nameOrig = e.target[0].defaultValue;
        let username = capitalizeFirstLetter(nameOrig);
        try {
            const data = await Axios.post(`${baseUrl}/api/register`
                , {
                    username: username,
                    email: e.target[1].defaultValue,
                    password: e.target[2].defaultValue,
                }
                , { withCredentials: true }
            )
                .then((res) => setUserCreated(res.statusText));
            setUserRegister({
                email: "",
                password: "",
                username: ""
            });
        } catch (err) {
            console.log(err);
        }
    };

    /* Capitalizes the first letter of name inputted in register page */
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /* user details input and displays error message if input is not valid */
    return (
        <div className="main-register-container" >
            { userCreated &&
                <>
                    <div className="login-prompt">
                        <span>Welcome! You can</span> <Link to="/login">Login</Link><span> now.</span>
                    </div>
                </>}
            <div className="inner-container">
                <div className="register-header">
                    <h1 className="heading">Register</h1>
                    <h3>Let's get you started.</h3>
                </div>
                <form action="/register" method="POST" className="register-form" id="registerformid" onSubmit={(e) => registerUser(e)} >
                    <div className="form-control">
                        <input
                            type="username"
                            id="username"
                            name="username"
                            placeholder="Name"
                            autoComplete="off"
                            value={userRegister.username}
                            onChange={(e) => { handleInputChange(e) }}
                        />
                        {(error.username) && <div className="errorDiv">{error.username}</div>}

                        <input
                            type="email"
                            className="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            value={userRegister.email}
                            onChange={(e) => { handleInputChange(e) }}
                        />
                        {(error.email) && <div className="errorDiv">{error.email}</div>}

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={userRegister.password}
                            onChange={(e) => { handleInputChange(e) }}
                        />
                        {(error.password) && <div className="errorDiv">{error.password}</div>}
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        className="btn"
                        name=""
                    />
                </form>
                <p className="registerLink">Already have an account? <Link to="/login">Sign In</Link></p>
            </div>



        </div>
    )
}
export default Register;