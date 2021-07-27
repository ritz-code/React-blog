import { useState, useEffect } from 'react';
import Axios from 'axios';
import Comments from '../components/comments';
import DateFormater from '../helpers/dateFormater';
import Login from './login';
import { BrowserRouter as Switch, Route, useParams } from 'react-router-dom';
import baseUrl from '../helpers/baseUrl';

/* dynamic individual blog page */
const BlogPage = (props) => {

    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    /* GETs the blog article and comments corresponding to blog id */
    const getBlogPage = async () => {
        try {
            setLoading(true);
            const data = await Axios.get(`${baseUrl}/api/blog/${id}`
                , { withCredentials: true }
            )
                .then((res) => {
                    setBlog(res.data[0]);
                    setLoading(false);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBlogPage();
    }, [id]);

    return (
        <>
            <div className="blog-background">
                {loading ?
                    <>
                        <div class="loading">Loading..</div>
                    </>
                    :
                    <>
                        <div className="blog-list">
                            <div className="blog-elems" key={blog && blog.id}>
                                <h2 className="blog-title"> {blog && blog.title}</h2>
                                <h6>By <span>Ritu Rawat</span> on {blog && DateFormater(blog.dated)}</h6>
                                <div className="blog-list-body">{blog && blog.body}</div>
                            </div>
                            <Comments id={id} />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

function BlogDetails() {
    return (
        <Switch>
            <Route path={"/blog/:id"} component={BlogPage} />
            <Route path="/login" component={Login} />
        </Switch>
    );
}

export default BlogDetails;