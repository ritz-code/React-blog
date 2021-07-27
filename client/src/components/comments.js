import React, { useEffect, useState, useContext } from 'react';
import DateFormater from '../helpers/dateFormater';
import Axios from 'axios';
import { UserContext } from '../helpers/userContext';
import { Link } from 'react-router-dom';
import baseUrl from '../helpers/baseUrl';

/* Comment list functionality in blog page */
const Comments = ({ id }) => {

    /* state declaration */
    const [commentInput, setCommentInput] = useState(" ");
    const [commentList, setCommentList] = useState([]);

    /* user data from UserContext */
    const { username, loggedIn } = useContext(UserContext);

    const getComments = async () => {
        try {
            const data = Axios.get(`${baseUrl}/api/comment/${id}`
                , { withCredentials: true }
            )
                .then((res) => {
                    setCommentList(res.data);
                    setCommentInput(" ");
                });
        }
        catch (err) {
            console.log(err);
        }
    }
    /* Submit comment function which POSTs comment only if user is logged in.
       Once the comment is posted, the new comment list is retrived from the API
       which appears in the comment area
    */
    const postComment = async (e) => {
        e.preventDefault();
        if (loggedIn) {
            try {
                const data = Axios.post(`${baseUrl}/api/comment`,
                    {
                        comment: commentInput,
                        username: username,
                        post_id: id,
                    },
                    {
                        withCredentials: true,
                    }
                ).then((result) => {
                    getComments();
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    };

    /* GET comments */
    useEffect(() => {
        getComments();
    }, [id]);

    return (
        <div className="comment-section">
            <h2>Leave a Comment</h2>
            <div className="login-prompt">

                {!loggedIn &&
                    <>
                        <span>Please login to comment.</span> <Link to="/login">Login</Link>
                    </>
                }
            </div>
            <input
                className="comment-input"
                type="text"
                name="commentInput"
                placeholder="Comment"
                autoComplete="off"
                value={commentInput}
                onChange={(e) => {
                    setCommentInput(e.target.value);
                }
                } />
            <button className="submit-btn" onClick={postComment}>Submit</button>

            {commentList && commentList.map((comment) => {
                return (
                    <div className="comment-elems" key={comment.id}>
                        <h3>{comment.username} <span>{DateFormater(comment.dated)}</span></h3>
                        <div className="comment-body">{comment && comment.comment}</div>
                    </div>
                );
            })}
            <div className="space"></div>
        </div>
    );
}

export default Comments;