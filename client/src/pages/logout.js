import React, { useContext, useEffect } from "react";
import Login from './login';
import Axios from 'axios';
import { UserContext } from '../helpers/userContext';
import baseUrl from '../helpers/baseUrl';

/* Logout functionality */
function Logout() {

    const { setLoggedIn } = useContext(UserContext);

    /* logout and UserContext dat aof loggeIn set to false */
    useEffect(() => {
        Axios.get(`${baseUrl}/api/logout`
            , { withCredentials: true }
        )
            .then((response) => {
                setLoggedIn(false);
            })
    });

    /* returns the login page */
    return (
        <>
            <Login />
        </>
    )

}
export default Logout;