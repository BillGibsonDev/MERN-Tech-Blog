import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import BlogSnip from '../../components/BlogSnip';

// loaders
import Loader from '../../loaders/Loader';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';
import { useSelector } from 'react-redux';

// router
import { useParams } from 'react-router-dom';

// images
import Linkedin from '../../images/linkedinBlack.png';
import Twitter from '../../images/twitterBlack.png';
import Insta from '../../images/instaBlack.png';
import Globe from '../../images/globe.png';
import Youtube from '../../images/youtube.png';
import Dot from "../../images/dot.png";
import Github from '../../images/githubBlack.png';

export default function CreatorPage ({username}) {

    const { authorUsername } = useParams();

    const dispatch = useDispatch();
    const articles = useSelector((state) => state.posts);

    const [ creator, setCreator ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ value, setValue ] = useState(10);

    useEffect(() => {
        window.scrollTo(0, 0);
        getPosts();
        const getCreator = () => {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_GET_CREATOR_URL}/${authorUsername}`)
            .then(function(response){
                setLoading(false);
                setCreator(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });
        };
        getCreator();
    }, [dispatch, authorUsername])

    const handleShowMore = () =>{
      let i = 10;
      setValue(value + i)
    }

    return (
        <StyledCreatorPage>
            {
                loading 
                ? <Loader />
                : <section>
                    {
                        creator.map((creator, key) => {
                            return (
                                <header key={key}>
                                    <div className="header-wrapper">
                                        <img id="avatar" src={creator.avatar} alt="" />
                                        <h4>{creator.creator}</h4>
                                        <p>{creator.bio}</p>
                                        <div className="info-container">
                                            <h6>{creator.location}</h6>
                                            <img id="dot" src={Dot} alt="" />
                                            <h6>{articles.length} Posts</h6>
                                            <img id="dot" src={Dot} alt="" />
                                            <div className="socials-container">
                                                {
                                                    creator.twitter === "" 
                                                    ? <></>
                                                    : <a href={creator.twitter} target="_blank" rel="noreferrer"><img src={Twitter} alt="" /></a>  
                                                }
                                                {
                                                    creator.youtube === "" 
                                                    ? <></>
                                                    :<a href={creator.youtube} target="_blank" rel="noreferrer"><img src={Youtube} alt="" /></a>
                                                }
                                                {
                                                    creator.linkedin === "" 
                                                    ? <></>
                                                    : <a href={creator.linkedin} target="_blank" rel="noreferrer"><img src={Linkedin} alt="" /></a>
                                                }
                                                {
                                                    creator.instagram === "" 
                                                    ? <></>
                                                    : <a href={creator.instagram} target="_blank" rel="noreferrer"><img src={Insta} alt="" /></a>
                                                }
                                                {
                                                    creator.github === "" 
                                                    ? <></>
                                                    : <a href={creator.github} target="_blank" rel="noreferrer"><img src={Github} alt="" /></a>
                                                }
                                                {
                                                    creator.other === "" 
                                                    ? <></>
                                                    : <a href={creator.other} target="_blank" rel="noreferrer"><img src={Globe} alt="" /></a>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </header>
                            )
                        })
                    }
                    <div className="blog">
                    <div className="blogWrapper">
                        {
                            articles.filter(articles => articles.authorUsername === `${authorUsername}`).slice().reverse().map((article, key) => {
                                return(
                                    <BlogSnip
                                        author={article.author}
                                        username={username}
                                        id={article._id}
                                        title={article.postTitle}
                                        date={article.postDate}
                                        linkTitle={article.linkTitle}
                                        thumbnail={article.thumbnail}
                                        comments={article.comments.length}
                                        likes={article.likes}
                                        tag={article.tag}
                                        authorUsername={article.authorUsername}
                                        key={key}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                {
                    articles.filter(articles => articles.authorUsername === `${authorUsername}`).length >= 10 
                    ? <button id="showmore" onClick={() => { handleShowMore() }}>Show More</button>
                    : <></>
                }
            </section>
        }
    </StyledCreatorPage >
    )
}

const StyledCreatorPage = styled.div`
    height: 100%;
    width: 100%;
    margin: 1em auto;
    display: flex;
    justify-content: center;
    align-items: center;
    header {
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px auto;
        width: 95%;
        max-width: 875px;
        .header-wrapper {
            width: 70%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-top: 10px;
            @media (max-width: 750px){
                width: 90%;
            }
            #avatar {
                width: 150px;
                margin: auto;
            }
            h4 {
                font-size: 1.5em;
                margin: auto;
            }
            p {
                font-size: 16px;
                margin: auto;
                @media (max-width: 750px){
                    font-size: 13px;
                }
            }
            .info-container {
                display: flex;
                width: 100%;
                justify-content: space-evenly;
                align-items: center;
                margin: 10px auto;
                h6 {
                    margin: auto;
                    font-size: 20px;
                    @media (max-width: 750px){
                        font-size: 14px;
                    }
                }
                #dot {
                    width: 10px;
                    @media (max-width: 750px){
                        width: 6px;
                    }
                }
                .socials-container {
                    display: flex;
                    justify-content: center;
                    margin: auto;
                    a {
                        width: 25px;
                        height: 25px;
                        margin: 0 6px;
                        img {
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
        }  
    }
    .blog {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 1em auto;
        .blogWrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100%;
            margin: 0 auto;
            border-radius: 12px;
        }
    }
    #showmore {
        height: 35px;
        width: 200px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
    }

`;