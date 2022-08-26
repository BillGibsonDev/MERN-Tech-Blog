import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import BlogSnip from '../../../components/BlogSnip';
import CreatorHeader from './components/CreatorHeader.js';

// loaders
import Loader from '../../../loaders/Loader';

// redux
import { useSelector } from 'react-redux';

// router
import { useParams } from 'react-router-dom';

export default function CreatorPage () {

    const { authorUsername } = useParams();

    const articles = useSelector((state) => state.posts);

    const [ creator, setCreator ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ value, setValue ] = useState(10);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getCreator = () => {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_CREATOR_URL}/${authorUsername}`)
            .then(function(response){
                setLoading(false);
                setCreator(response.data[0]);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });
        };
        getCreator();
    }, [ authorUsername ])

    const handleShowMore = () =>{
      let i = 10;
      setValue(value + i);
    }

    return (
        <StyledCreatorPage>
            {
                loading 
                ? <Loader />
                : <section>
                    <CreatorHeader
                        creator={creator}
                        articles={articles}
                    />
                    <div className="blog">
                        <div className="blogWrapper">
                            {
                                articles.filter(articles => articles.authorUsername === `${authorUsername}`).slice().reverse().map((article, key) => {
                                    return(
                                        <BlogSnip
                                            author={article.author}
                                            id={article._id}
                                            title={article.postTitle}
                                            date={article.postDate}
                                            linkTitle={article.linkTitle}
                                            thumbnail={article.thumbnail}
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