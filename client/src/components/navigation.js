import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../helpers/userContext';

/* Navbar links */
function Navigation() {

    /* user data from userContext */
    const { username, loggedIn } = useContext(UserContext);

    return (
        <nav className="site-navigation">
            <div className="logo">Ritu Rawat</div>
            <div className="nav-list">
                <ul>
                    <li>
                        <Link to='/'>About</Link>
                        <Link to='/content'>Blog</Link>
                        {!loggedIn ?
                            (<React.Fragment>
                                <Link to='/login'>Login</Link>
                                <Link to='/register'>Register</Link>
                            </React.Fragment>) :
                            (<React.Fragment>
                                <Link to='/content'>{username}</Link>
                                <Link to='/logout'>Logout</Link>
                            </React.Fragment>)
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;