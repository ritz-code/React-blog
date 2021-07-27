import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import DateFormater from '../helpers/dateFormater';
import { Link } from 'react-router-dom';
import baseUrl from '../helpers/baseUrl';

/* lists all the blog articles in a clipped format */
function BlogItems() {

    const [blogList, setBlogList] = useState([]);
    const [loading, setLoading] = useState(false);

    /* GETs all the blog articles */
    const getBlogList = async () => {
        try {
            setLoading(true);
            const data = await Axios.get(`${baseUrl}/api/get`
                , { withCredentials: true }
            )
                .then((res) => {
                    setBlogList(res.data);
                    setLoading(false);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBlogList();
    }, []);

    return (
        <div className="blog-list">
            { loading ?
                <>
                    <div class="loading">Loading..</div>
                </>
                :
                <>
                    <div className="inner-container">
                    {blogList && blogList.map((blog) => {
                        return (
                            <div className="blog-elems">
                                <div className="blog-title"><Link to={`/blog/${blog.id}`}>{blog.title}</Link></div>
                                <h6>By <span>Ritu Rawat</span> on {DateFormater(blog.dated)}</h6>
                                <div className="blog-list-body">{blog && blog.body.slice(0, 200) + '...'}</div>
                            </div>
                        );
                    })}
                    </div>
                </>
            }
        </div>
    )
}

export default BlogItems;
