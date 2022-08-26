import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../Styled/ThemeVariables.js';

// router
import { Link } from 'react-router-dom';

export default function BlogSnip({
    id, 
    title, 
    thumbnail, 
    linkTitle,
    date,
    author,
    tag,
    authorUsername
}) {

    const [ creator, setCreator ] = useState([]);
    const [ splitDate, setSplitDate ] = useState('');

    useEffect(() => {
        const handleCreator = () => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_CREATOR_URL}/${authorUsername}`)
            .then(function(response){
                setCreator(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        const handleDate = () => {
            const [ year, month, day ] = date.split('-');
            setSplitDate(`${month}-${day}-${year}`);
        }
        if(date){
            handleDate(date);
        }
        handleCreator();
    }, [ authorUsername, id, date])

    return (
        <StyledSnip id={id}>
            <div className="article-wrapper">
                <Link id="thumbnail" to={`/post/${linkTitle}/${id}`}>
                    <img src={thumbnail} alt={thumbnail} />
                </Link>
                <div className="info-wrapper">
                    <Link id="tag" to={`/articles/${tag}`}>#{tag}</Link>
                    <Link id="title" to={`/post/${linkTitle}/${id}`}>{title}</Link>
                    <div className="info-container">
                        <div className="author-header">
                            <img src={creator.avatar} alt="" />
                            <Link to={`/creators/${authorUsername}`}>{author}</Link>
                        </div>
                        <h5 id="date">{splitDate}</h5>
                    </div>
                </div>
            </div>
        </StyledSnip>
    )
}

const StyledSnip = styled.div`
    height: 30vh;
    display: flex;
    justify-content: space-between;
    margin: 1em auto 5em auto;
    align-items: center;
    width: 100%;
    max-width: 875px;
    @media (max-width: 750px){
        height: 100%;
    }
    .article-wrapper {
        display: flex;
        width: 90%;
        height: 100%;
        margin: auto;
        @media (max-width: 750px){
            flex-direction: column;
        }
        #thumbnail {
            width: 50%;
            height: 100%;
            @media (max-width: 750px){
                width: 100%;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .info-wrapper {
            display: flex;
            flex-direction: column;
            width: 46%;
            height: 70%;
            margin: auto;
            @media (max-width: 750px){
                width: 100%;
            }
            a {
                margin: 6px 0;
                &:hover {
                    text-decoration: underline;
                }
            }
            #tag { 
                font-size: 18px;
                color: ${pallette.helperGrey};
            }
            #title {
                color: white;
                font-size: 28px;
                margin: 6px 0;
                 @media (max-width: 750px){
                    margin: 3px 0;
                }
            }
            .info-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 98%;
                margin: 6px auto;
                @media (max-width: 750px){
                    width: 100%;
                    margin: 10px auto;
                }
                 .author-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img {
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-right: 4px;
                    }
                    a {
                        font-size: 18px;
                        color: ${pallette.helperGrey};
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
                #date {
                    font-weight: 400;
                    color: ${pallette.helperGrey};
                    font-size: 14px;
                }
            }
        }
    }
`;
