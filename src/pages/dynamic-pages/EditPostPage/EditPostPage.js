import { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';

// styled
import styled from 'styled-components';
import { StyledButton } from '../../../Styled/StyledButton';
import * as pallette from '../../../Styled/ThemeVariables.js';

// router
import  { useParams } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// components
import EditIntro from './components/EditForm';

export default function EditPostPage() {

    const { postId } = useParams();

    const user = useSelector((state) => state.user );

    const [ isLoading, setLoading ] = useState(true);
    const [ article, setArticle ] = useState({});

    useEffect(() => {
        const handlePost = () => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_POST_URL}/${postId}`, {
                postId: postId,
            })
            .then(function(response){
                setLoading(false);
                setArticle(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        handlePost(postId);
    }, [ postId, user ])

    const [ postTitle, setPostTitle ] = useState(article.postTitle);
    const [ linkTitle, setLinkTitle ] = useState(article.linkTitle);
    const [ postDate, setPostDate ] = useState(article.postDate);
    const [ thumbnail, setThumbnail ] = useState(article.thumbnail);
    const [ content, setContent ] = useState(article.content);
    const[ tag, setTag ] = useState(article.tag);

    const handleUpdate = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_UPDATE_POST_URL}/${postId}`, {
            postId: postId,
            postTitle: postTitle,
            linkTitle: linkTitle,
            postDate: postDate,
            thumbnail: thumbnail,
            content: content,
            tag: tag,
        })
        .then(function(response){
            if(response.data === "Post Updated"){
                alert('Post Updated')
                setLoading(false);
            } else {
                alert("Server Error - Post Not Updated")
                setLoading(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const deletePost = () => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.delete(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_POST_URL}/${postId}`)
            .then(function(response){
                if(response.data === "Post Deleted"){
                    setLoading(false);
                    alert('Post Deleted!');
                } else {
                    setLoading(false);
                    alert("Server Error - Post not updated");
                }
            })
        }
    }

    return (
        <StyledEditPage>
            {
                isLoading
                ? <h1>Loading</h1>
                : <div className="form-wrapper">
                    <EditIntro
                        article={article}
                        setLinkTitle={setLinkTitle}
                        setPostDate={setPostDate}
                        setThumbnail={setThumbnail}
                        setContent={setContent}
                        setPostTitle={setPostTitle}
                        setTag={setTag}
                    />
                    <h2>Preview</h2>
                    <div className="content-container"
                            dangerouslySetInnerHTML={{
                                __html: marked(article.content),
                            }}
                        >
                    </div>  
                    <div className="bottom-button-container">
                        <StyledButton onClick={() => { handleUpdate() }}>Update</StyledButton>
                        <StyledButton id="delete" onClick={() => { deletePost() }}>Delete</StyledButton>
                    </div>
                </div>
            }
        </StyledEditPage>
    )
}

const StyledEditPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 875px;
    min-height: 100vh;
    margin: 20px auto;
    .form-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        border-radius: 12px;
        h2 {
            color: ${pallette.helperGrey};
            font-size: 2em;
            border-bottom: 2px solid white;
            width: 100%;
            margin-bottom: 20px;
            width: 90%;
            margin: auto;
        }
        .content-container {
            width: 90%;
            margin: auto;
            ul {
                list-style: square inside;
            }
            img {
                width: 100%;
            }
            p, li {
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
            h4 {
                color: #ffffff;
                font-size: 24px;
                margin: 10px 0 6px 0;
                @media (max-width: 750px){
                    font-size: 1.5em;
                }
            }
            code {
                display: flex;
                background: white;
                padding: 20px;
                font-size: 16px;
                margin: 10px 0;
            }
        }
        .bottom-button-container {
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin-bottom: 10px;
            #delete {
                background: #da4040;
                &:hover {
                    background: red;
                }
            }
        }
    }
`;