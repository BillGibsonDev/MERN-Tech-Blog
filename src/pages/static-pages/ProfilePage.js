import { useState, useEffect } from 'react';
import axios from 'axios';

// components
import Loader from '../../loaders/Loader';

// styled
import styled from 'styled-components';
import * as pallette from '../../Styled/ThemeVariables.js';

// router
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// functions
import { useConfirmRole } from '../../functions/ConfirmRole';

export default function ProfilePage() {

    const [ isLoading, setLoading ] = useState(true);
    const [ joinDate, setJoinDate ] = useState("");

    const user = useSelector((state) => state.user);
    const articles = useSelector((state) => state.posts);

    let tokenPW = sessionStorage.getItem("tokenPW");
	let tokenUser = sessionStorage.getItem("tokenUser");

    const confirm  = useConfirmRole(user.role);

    useEffect(() => {
        const handleJoinDate = () => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_LOGIN_URL}`, {
                username: tokenUser,
                password: tokenPW,
            })
            .then(function(response){
                if (response.data === "LOGGED IN"){
                    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_DATE_URL}`, {
                        username: tokenUser, 
                        password: tokenPW,
                    })
                    .then((response) => {
                        setJoinDate(response.data)
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        handleJoinDate();
        setLoading(false);
    }, [ user, tokenPW, tokenUser, confirm ])

    return (
        <StyledProfilePage>
            <h1>Profile</h1>
            <header>
                <div className="user-container">
                    <h2><span>Username: </span>{user.user}</h2>
                    <h2><span>Joined: </span>{joinDate}</h2>
                </div>
            </header>
            {
                user.role === process.env.REACT_APP_ADMIN_SECRET || user.role === process.env.REACT_APP_CREATOR_SECRET 
                ? <div className="creator-dashboard">
                    <h3>Creator Dashboard</h3>
                    <div className="link-container">
                        <Link to="/CreatePostPage">Create Post</Link>
                        <Link to={`/edit-creator/${user.user}`}>Edit Creator</Link>
                        {
                            user.role === process.env.REACT_APP_ADMIN_SECRET 
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
                        : !isLoading  && articles.filter(articles => articles.authorUsername === `${user.user}`).length === 0 
                        ? <p>No Articles Found</p>
                        : <div className="article-wrapper" > 
                            {
                                articles.filter(articles => articles.authorUsername === `${user.user}`).map((article, key) => {
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
        width: 90%;
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
            width: 90%;
            min-height: 200px;
            @media (max-width: 750px){
                flex-direction: column;
                justify-content: left;
            }
            h2 {
                margin: 20px 0;
                color: white;
                font-size: 24px;
                @media (max-width: 1150px){
                    margin: 10px 0;
                }
                span {
                    color: ${pallette.helperGrey};
                }
            }
        }
    }
    .creator-dashboard {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-top: 20px;
        min-height: 400px;
        h3 {
            color: white;
            border-bottom: 2px solid white;
        }
        .link-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            row-gap: 20px;
            justify-content: space-between;
            width: 100%;
            margin: 6px 0 auto 0;
            a {
                font-size: 24px;
                color: ${pallette.helperGrey};
                transition: 0.2s;
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
            @media (max-width: 750px){
                grid-template-columns: 1fr;
            }
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