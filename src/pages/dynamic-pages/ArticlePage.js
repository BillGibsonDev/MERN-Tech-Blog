import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../Styled/ThemeVariables.js';

// loaders
import Loader from '../../loaders/Loader';

// router
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

//images
import Edit from '../../images/editIconWhite.png';

export default function BlogArticle({ role, username }) {

    const { id } = useParams();
    
    const [ postId, setPostId ] = useState(id);
    const [ creator, setCreator ] = useState([]);
    const [ article, setArticle ] = useState([]);
    const [ authorUsername, setAuthorUsername ] = useState('');
    const [ isLoading, setLoading ] = useState(true);
    const [ splitDate, setSplitDate ] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        setPostId(id);
        const getPosts = () => {
            axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`)
            .then(function(response){
                setArticle(response.data);
                setAuthorUsername(response.data.authorUsername);
                setLoading(false);
            })
        }
        getPosts();
    }, [ id, username, postId ]);

    useEffect(() => {
        const handleCreator = () => {
            axios.get(`${process.env.REACT_APP_GET_CREATOR_URL}/${authorUsername}`)
            .then(function(response){
                setCreator(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        const handleDate = () => {
            const [ year, month, day ] = article.postDate.split('-');
            setSplitDate(`${month}-${day}-${year}`);
        }
        if(article.postDate){
            handleDate(article.postDate);
        }
        handleCreator();
    }, [ authorUsername, article ]);

    return (
        <StyledArticle>
            { 
                isLoading 
                ? <Loader />
                : <>
                    <div className="article-content">
                        <div className="title-container">
                            <h4>{article.postTitle}</h4>
                            <div className="icon-container">
                                <Link id="tag-link" to={`/articles/${article.tag}`}>#{article.tag}</Link>
                                <div className="button-container">
                                    {
                                        role === process.env.REACT_APP_ADMIN_SECRET || username === article.authorUsername 
                                        ? <Link to={`/EditPostPage/${postId}`}><img id="edit" src={Edit} alt="" /></Link>
                                        : <></>
                                    }
                                </div> 
                            </div>
                        </div>
                        <img id="thumbnail" src={article.thumbnail} alt="" />
                        <div className="info-container">
                            <div className="author-container">
                                {
                                    creator[0] === undefined 
                                    ? <img src="" alt="" />
                                    : <img src={creator[0].avatar} alt="" />
                                }
                                <Link to={`/creators/${article.authorUsername}`}>{article.author}</Link>
                            </div>
                            <h5>{splitDate}</h5>
                        </div>
                        {
                            article.postIntro === '' 
                            ? <></>
                            : <p id="intro-para">{article.postIntro}</p>
                        }
                        {
                            article.sections.map((section, key) => {
                                return (
                                    <div className="para-wrapper" key={key}>
                                        {
                                            section.title === ""
                                            ? <></>
                                            : <h6>{section.title}</h6>
                                        }
                                        {
                                            section.image === ""
                                            ? <></>
                                            : <img src={section.image} alt='' />
                                        }
                                        {
                                            section.paragraph === ""
                                            ? <></>
                                            : <p>{section.paragraph}</p>
                                        }
                                        {
                                            section.link === ""
                                            ? <></>
                                            : <a href={section.link} target="_blank" rel="noreferrer">{section.link}</a>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            creator[0] === undefined 
                            ? <footer>
                                <img src="" alt="" />
                                <div className="author-info-wrapper">
                                    <Link to={`/creators/${article.authorUsername}`}>{article.author}</Link>
                                </div>
                            </footer>
                            : <footer>
                                <img src={creator[0].avatar} alt="" />
                                <div className="author-info-wrapper">
                                    <Link to={`/creators/${article.authorUsername}`}>{article.author}</Link>
                                    <p>{creator[0].bio}</p>
                                </div>
                            </footer>
                        }
                    </div>
                </>
            }
        </StyledArticle>
    )
}

const StyledArticle = styled.div`
    min-height: 20vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 2em auto;
    align-items: center;
    width: 95%;
    max-width: 875px;
    border-radius: 14px;
    position: relative;
    .article-content {
        position: relative;
        width: 90%;
        display: flex;
        flex-direction: column;
        margin: auto;
        border-radius: 20px;
        .title-container {
            width: 100%;
            height: 100%;
            margin: 10px auto;
            h4 {
                font-size: 30px;
                margin-bottom: 10px;
                color: #ffffff;
                @media (max-width: 750px){
                    font-size: 1.5em;
                }
            }
            .icon-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 300px;
                margin-bottom: 10px;
                @media (max-width: 750px){
                    width: 100%;
                    margin-bottom: 20px; 
                }
                a {
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    color: ${pallette.helperGrey};
                    #edit {
                        width: 25px;
                        margin-right: 20px;
                    }
                }
                .button-container {
                    display: flex;
                    img {
                        width: 25px;
                        cursor: pointer;
                    }
                }
            }
        }
        #thumbnail {
            width: 100%;
            max-width: 900px;
        }
        .info-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: 300px;
            margin: 10px 0 30px 0;
            .author-container {
                display: flex;
                width: 110px;
                justify-content: space-between;
                align-items: center;
                img {
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                a {
                    font-size: 16px;
                    color: ${pallette.helperGrey};
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            h5 {
                color: ${pallette.helperGrey};
                font-weight: 400;
            }
        }
        #intro-para {
            color: ${pallette.helperGrey};
            margin-top: 6px;
            font-weight: 400;
            font-size: 20px;
        }
        .para-wrapper{
            img {
                width: 100%;
            }
            p {
                font-size: 20px;
                margin-bottom: 1.5em;
                letter-spacing: 0.5px;
                line-height: 1.7;
                color: ${pallette.helperGrey};
                @media (max-width: 750px){
                    font-size: 16px;
                }
            }
             a {
                color: ${pallette.helperGrey};
                font-size: 1em;
                &:hover {
                    text-decoration: underline;
                }
            }
            h6 {
                color: #ffffff;
                font-size: 2em;
                margin: 10px 0 6px 0;
                @media (max-width: 750px){
                    font-size: 1.5em;
                }
            }
        }
        footer {
            display: flex;
            align-items: center;
            border-top: 2px solid #ffffff;
            border-bottom: 2px solid #ffffff;
            padding: 10px 0;
            img {
                width: 50px;
            }
            .author-info-wrapper {
                margin-left: 6px;
                a {
                    font-size: 16px;
                    color: #fff;
                }
                p {
                    font-size: 12px;
                    color: ${pallette.helperGrey};
                }
            }
        }
    }
`;