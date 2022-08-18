import { useState, useEffect } from 'react';
import axios from 'axios';

// components
import Loader from '../../loaders/Loader';

// styled
import styled from 'styled-components';
import * as pallette from '../../Styled/ThemeVariables.js';

// router
import { Link, useNavigate } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';
import { useSelector } from 'react-redux';
import { StyledButton } from '../../Styled/Styled';

export default function ProfilePage({ username, role }) {

    const [ isLoading, setLoading ] = useState(true);
    const [ joinDate, setJoinDate ] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    let tokenPW = sessionStorage.getItem("tokenPW");
	let tokenUser = sessionStorage.getItem("tokenUser");

   useEffect(() => {
        dispatch(getPosts());
        const handleJoinDate = () => {
            axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
                username: tokenUser,
                password: tokenPW,
            })
            .then(function(response){
                if (response.data === "LOGGED IN"){
                    axios.post(`${process.env.REACT_APP_GET_DATE_URL}`, {
                        username: tokenUser, 
                        password: tokenPW,
                    })
                    .then((response) => {
                        setJoinDate(response.data)
                    })
                }
            })
            .catch(function (error) {
                throw error;
            });
        }
        handleJoinDate();
        setLoading(false)
    }, [dispatch, role, username, tokenPW, tokenUser])

    const articles = useSelector((state) => state.posts);

    const handleDelete = () => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.delete(`${process.env.REACT_APP_DELETE_ACCOUNT_URL}`, {
                username: tokenUser,
                password: tokenPW,
            })
            .then(function(response){
                if(response.data !== "Account Deleted"){
                    setLoading(false);
                    alert("Server Error - Post not updated")
                } else {
                    setLoading(false);
                    navigate("/");
                    alert('Account Deleted');
                }
            })
        }
    }

    return (
        <StyledProfilePage>
            <h1>Profile</h1>
            {
                username === "" 
                ? <h1>You are signed out</h1>
                : <>
                    <header>
                        <div className="user-container">
                            <h2><span>Username: </span>{username}</h2>
                            <h2><span>Joined: </span>{joinDate}</h2>
                        </div>
                        <StyledButton id="delete" onClick={() => {handleDelete() }}>Delete Account</StyledButton>
                    </header>
                </>
            }
            {
                role === process.env.REACT_APP_ADMIN_SECRET || role === process.env.REACT_APP_CREATOR_SECRET 
                ? <div className="creator-dashboard">
                    <h3>Creator Dashboard</h3>
                    <div className="link-container">
                        <Link to="/CreatePostPage">Create Post</Link>
                        {
                            role === process.env.REACT_APP_ADMIN_SECRET 
                            ?  <>
                                <Link to="/CreateUser">Create User</Link>
                                <Link to="/CreateCreator">Create Creator</Link>
                            </>
                            : <></>
                        }
                    </div>
                    <h4>Your Articles</h4>
                    {
                        isLoading
                        ? <Loader />
                        : !isLoading  && articles.filter(articles => articles.authorUsername === `${username}`).length === 0 
                        ? <p>No Articles Found</p>
                        : <div className="article-wrapper" > 
                            {
                                articles.filter(articles => articles.authorUsername === `${username}`).map((article, key) => {
                                    return (
                                        <div className="article-container" key={key}>
                                            <h5>{article.postDate}</h5>
                                            <Link to={`/post/${article.linkTitle}/${article._id}`} key={key}>{article.postTitle}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div> 
                    }
                </div>
                : <></>
            }
        </StyledProfilePage>
    )
}

const StyledProfilePage = styled.div`
    width: 100%;
    min-height: 60vh;
    max-width: 875px;
    margin: 2em auto;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    h1 {
        font-size: 3em;
        color: #ffffff;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        width: 50%;
        border-bottom: 2px #ffffff solid;
    }
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        .user-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            @media (max-width: 1150px){
                flex-direction: column;
            }
            h2 {
                margin: 20px 0;
                color: white;
                @media (max-width: 1150px){
                    margin: 10px 0;
                    font-size: 2em;
                }
                span {
                    color: ${pallette.helperGrey};
                }
            }
        }
        #delete {
            margin-top: 50px;
            background: #fc5252;
            &:hover {
                background: red;
            }
        }
    }
    .creator-dashboard {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-top: 3em;
        h3 {
            color: white;
            border-bottom: 2px solid white;
        }
        .link-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin: 6px 0 10px 0;
            a {
                font-size: 2em;
                color: ${pallette.helperGrey};
                &:hover {
                    color: black;
                }
            }
        }
        h4 {
            color: white;
            font-size: 2em;
        }
        p {
            color: white;
            margin: 6px 0;
            font-size: 1em;
        }
        .article-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            .article-container {
                display: flex;
                align-items: center;
                background: #ffffff;
                border: 2px white solid;
                border-radius: 8px;
                padding: 0 10px;
                width: 95%;
                min-height: 40px;
                margin: 10px 0;
                transition: 0.2s;
                &:hover {
                    background: #fff;
                    border: 2px black solid;
                }
                h5 {
                    font-size: 16px;
                    margin-right: 6px;
                }
                a {
                    font-size: 18px;
                    color: black;
                }
            }
        }
    }
`;