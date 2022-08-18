import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Comment from '../components/Comment';

// functions
import { unauthorized } from '../functions/Unauthorized.js';

// router
import Loader from '../loaders/Loader';

export default function PostPage({ username, role, isLoggedIn, postId }) {

    const [ comments, setComments ] = useState([]);
    const [ addComment, setAddComment] = useState('');
    const [ addAuthor, setAuthor] = useState(username);
    const [ addDate, setAddDate] = useState('');
    const [ isLoading, setLoading ] = useState(false);
    
    useEffect(() => {
        const getPosts = () => {
            axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`)
            .then(function (response){
                setComments(response.data.comments);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        const handleDate = () => {
            const current = new Date();
            const date = `${current.getHours()}:${current.getMinutes()} - ${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
            setAddDate(date);
        }
        getPosts();
        handleDate();
        setAuthor(username);
    }, [ postId, username, isLoading ]);

    const handleDate = () => {
        const current = new Date();
        const date = `${current.getHours()}:${current.getMinutes()} - ${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        setAddDate(date);
    }

    const sendComment = () => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_SEND_COMMENT_URL}/${postId}/comments`, {
            postId: postId,
            comment: addComment,
            date: addDate,
            author: addAuthor,
        })
        .then(function(response) {
            if(response.data !== "Comment Created"){
                setLoading(false);
                alert("Server Error - Comment not created!");
            } else {
                setLoading(false);
            }
        })
    }

    return (
        <StyledCommentSection>
            <h1>Comments</h1>
            { 
                comments === undefined 
                ? <></>
                : <>
                    {
                        comments.slice().reverse().map((comment, key) => {
                            return (
                                <Comment
                                    date={comment.date}
                                    author={comment.author}
                                    comments={comment.comment}
                                    commentId={comment._id}
                                    username={username}
                                    postId={postId}
                                    key={key}
                                    role={role}
                                    setLoading={setLoading}
                                    isLoading={isLoading}
                                />
                            )
                        })
                    }
                </>
            }
            {
                isLoading
                ? <Loader />
                : <div className="comment-maker">
                    <textarea 
                        name="comment" 
                        id="comment" 
                        required
                        onChange={(event) => {
                            setAddComment(event.target.value);
                        }}  
                    />
                    {
                        !isLoggedIn
                        ? <button onClick={()=> { unauthorized();}}>Reply</button>
                        : <button onClick={()=> { handleDate(); sendComment();}}>Reply</button>
                    }
                </div>
            }
        </StyledCommentSection>
    )
}

const StyledCommentSection = styled.div`
    width: 98%;
    margin: 20px auto;
    min-height: 20vh;
    position: relative;
    border: 1px #ffffff4b solid;
    .undefined {
        width: 98%;
    }
    h1 {
        width: 95%;
        margin: auto;
        color: #ffffff;
    }
    .comment-maker {
        width: 60%;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
        @media (max-width: 750px){
            width: 90%;
        }
        textarea {
            border-radius: 4px;
            background: #d6d6d6;
            padding: 2px;
            min-height: 10vh;
        }
        button {
            margin: 1% auto;
            width: 150px;
            cursor: pointer;
            color: #0f4d92;
            background: white;
            border: none;
            border-radius: 4px;
            font-size: 1.2em;
            font-weight: 700;
            @media (max-width: 750px){
                font-size: 1.5em;
            }
            &:hover {
                transform: scale(1.05);
                transition: 0.2s;
                background: #d1d1d1;
                color: black;
            }
        }
    }
    .comment-container {
        max-height: 40vh;
        overflow-y: scroll;
    }
`;
