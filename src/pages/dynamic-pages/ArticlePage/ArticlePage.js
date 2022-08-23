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

export default function BlogArticle() {

    const { id } = useParams();
    
    const user = useSelector((state) => state.user );

    const [ postId ] = useState(id);
    const [ creator, setCreator ] = useState([]);
    const [ article, setArticle ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);
    const [ splitDate, setSplitDate ] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const getPosts = () => {
            axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`)
            .then(function(response){
                setArticle(response.data);
                setLoading(false);
                if(response){
                    const [ year, month, day ] = response.data.postDate.split('-');
                    setSplitDate(`${month}-${day}-${year}`);
                    axios.get(`${process.env.REACT_APP_GET_CREATOR_URL}/${response.data.authorUsername}`)
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
    
    return (
        <StyledArticle>
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
            }
            p, li {
                font-size: 20px;
                margin-bottom: 1.5em;
                letter-spacing: 1px;
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
            h4 {
                color: #ffffff;
                font-size: 1.5em;
                margin: 10px 0 6px 0;
            }
            code {
                display: flex;
                background: white;
                padding: 20px;
                font-size: 16px;
                margin: 10px 0;
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