import React, { useState } from 'react';
import Axios from 'axios';
import baseUrl from '../helpers/baseUrl';

/* creating new blog pages */
function BlogEntry() {

    /* states for blog title and content */
    const [blogTitle, setBlogTitle] = useState('');
    const [blogText, setBlogText] = useState('');

    /* POSTing the blog data on submit */
    const submitBlogEntry = async () => {
        try {
            const data = await Axios.post(`${baseUrl}/api/insert`,
                {
                    title: blogTitle,
                    body: blogText,
                }
                , {
                    withCredentials: true,
                    credentials: 'include'
                }
            )
                .then((err) => {
                    console.log(err);
                    setBlogTitle('');
                    setBlogText('');
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        /* Blog title and blog text entry fields */
        <div className="blog-size">
            <div className="form">
                <input
                    className="blog-title"
                    type="text"
                    name="blogTitle"
                    value={blogTitle}
                    placeholder="Enter blog title"
                    onChange={(e) => {
                        setBlogTitle(e.target.value);
                    }} />
                <textarea
                    className="blog-text"
                    type="textarea"
                    name="blogText"
                    value={blogText}
                    placeholder="Enter blog text"
                    onChange={(e) => {
                        setBlogText(e.target.value)
                    }} />
                <button className="submit-btn" onClick={submitBlogEntry}>Save Article</button>
            </div>
        </div>
    )
}

export default BlogEntry;