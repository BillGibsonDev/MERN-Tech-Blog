import { useState, useEffect } from 'react';
import axios from 'axios';

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
import Section from './components/Section.js';

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
                        {
                            article.sections.map((section, key) => {
                                return (
                                    <Section
                                        section={section}
                                        key={key}
                                    />
                                )
                            })
                        }
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