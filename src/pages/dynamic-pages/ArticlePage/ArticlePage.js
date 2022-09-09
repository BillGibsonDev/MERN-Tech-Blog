import { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';

// styled
import styled from 'styled-components';
import * as pallette from '../../../Styled/ThemeVariables.js';

// loaders
import Loader from '../../../loaders/Loader';

// router
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

// redux
import { useSelector } from 'react-redux';

// components
import Intro from './components/Intro.js';
import { Helmet } from 'react-helmet';

export default function BlogArticle() {

    const { id } = useParams();
    
    const user = useSelector((state) => state.user );

    const [ postId ] = useState(id);
    const [ creator, setCreator ] = useState([]);
    const [ article, setArticle ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);
    const [ splitDate, setSplitDate ] = useState('');
    const [ shortDesc, setShortDesc ] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const getPosts = () => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_POST_URL}/${postId}`)
            .then(function(response){
                setArticle(response.data);
                setShortDesc(response.data.content.slice(0, 100))
                setLoading(false);
                //document.querySelector('meta[meta="og:image"]').setAttribute("content", `${response.data.thumbnail}`);
                if(response){
                    const [ year, month, day ] = response.data.postDate.split('-');
                    setSplitDate(`${month} - ${day} - ${year}`);
                    axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_CREATOR_URL}/${response.data.authorUsername}`)
                    .then(function(response){
                        setCreator(response.data[0]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            })
        }
        getPosts();
    }, [ id, user, postId ]);
    
    console.log(window)

    return (
        <StyledArticle>
            <Helmet>
                <title>{article.postTitle}</title>
                <meta name="description" content={shortDesc} />
                <meta property="og:url" content="https://dainty-trifle-b85068.netlify.app/" />
                <meta property="og:site_name" content="Tech Blog" />
                <meta property="og:title" content={article.postTitle} />
                <meta property="og:description" content={shortDesc} />
                <meta property="og:image" content={article.thumbnail} />
                <meta property="twitter:image" content={article.thumbnail} />
                <meta property="twitter:description" content={shortDesc} />
                <meta property="twitter:title" content={article.postTitle} />
            </Helmet>
            { 
                isLoading 
                ? <Loader />
                : <>
                    <div className="article-content">
                        <Intro
                            article={article}
                            splitDate={splitDate}
                            postId={postId}
                            creator={creator}
                        />
                        <div className="content-container"
                            dangerouslySetInnerHTML={{
                                __html: marked(article.content),
                            }}
                        >
                        </div>  
                        <div className="bottom-author-container">
                            <img src={creator.avatar} alt="" />
                            <div className="author-info-wrapper">
                                <Link to={`/creators/${article.authorUsername}`}>{article.author}</Link>
                                <p>{creator.bio}</p>
                            </div>
                        </div>
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
    margin: 20px auto;
    align-items: center;
    width: 95%;
    max-width: 900px;
    position: relative;
    .article-content {
        position: relative;
        width: 90%;
        display: flex;
        flex-direction: column;
        margin: auto;
        border-radius: 20px;
        .content-container {
           ul {
                list-style: square inside;
            }
            img {
                width: 100%;
                margin-bottom: 10px;
            }
            p, li {
                font-size: 1rem;
                margin-bottom: 1.5em;
                letter-spacing: .5px;
                line-height: 1.7;
                color: #fff;
            }
            a {
                color: #9acdff;
                font-size: 1rem;
                text-decoration: underline;
            }
            h4 {
                color: ${pallette.titleColor};
                margin: 30px 0 6px 0;
                font-size: 2.5rem;
            }
            h5 {
                color: ${pallette.titleColor};
                margin: 10px 0;
                font-size: 2rem;
            }
            h6 {
                color: ${pallette.titleColor};
                margin: 10px 0 6px 0;
                font-size: 1.5rem;
            }
            code {
                display: flex;
                background: white;
                padding: 10px;
                font-size: 1rem;
                margin: 10px 0;
                white-space: pre-wrap;
            }
        }
        .bottom-author-container {
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