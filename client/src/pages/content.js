import React, { useContext, useEffect, useState } from 'react';
import BlogEntry from '../components/blogEntry';
import BlogItems from './blogItems';
import { UserContext } from '../helpers/userContext';

/* Blog content page (the OG), blog article input and blogs list */
function Content() {
    const { username } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    /* checks for Admin, if Admin blog article input is visible and allowed */
    useEffect(() => {
        if (username === "Admin") setIsAdmin(true);
    }, [username]);

    return (
        <>
            <div className="blog">
                {isAdmin && <BlogEntry />}

                <BlogItems />
            </div>
        </>
    )
}

export default Content;