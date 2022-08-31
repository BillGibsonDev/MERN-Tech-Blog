import { useState, useEffect } from 'react';

// styled
import styled from 'styled-components';

// components
import BlogSnip from '../../components/BlogSnip';
import Loader from '../../loaders/Loader';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';
import { useSelector } from 'react-redux';

export default function HomePage () {

    const dispatch = useDispatch();

    const articles = useSelector((state) => state.posts );

    const [ number, setNumber ] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getPosts());
        setNumber(articles.length);
    }, [dispatch, articles.length])

    const [ value, setValue ] = useState(10);

    const handleShowMore = () => {
      let i = 10;
      setValue(value + i)
    }

    return (
        <StyledHomePage>
            <div className="blog">
                <div className="blog-wrapper">
                    {
                       number === 0 
                        ? <Loader />
                        : articles.map((article, key) => {
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
                articles.length >= 10 
                ? <button id="showmore" onClick={() => { handleShowMore() }}>Show More</button>
                : <></>
            }
        </StyledHomePage >
    )
}

const StyledHomePage = styled.div`
    height: 100%;
    width: 100%;
    margin: 0 auto;
    max-width: 875px;
    #showmore {
        height: 35px;
        width: 200px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
    }
    .blog {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        .blog-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100%;
            margin: 0 auto;
            border-radius: 12px;
        }
    }
`;