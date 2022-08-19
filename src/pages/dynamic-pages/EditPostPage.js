import { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import  { useParams } from 'react-router-dom';
import { StyledButton } from '../../Styled/Styled';

export default function EditPostPage({username, role, confirmRole}) {

    const { postId } = useParams();

    const [ isLoading, setLoading ] = useState(true);
    const [ article, setArticle ] = useState({});

    useEffect(() => {
        const handlePost = () => {
            axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`, {
                postId: postId,
            })
            .then(function(response){
                setLoading(false);
                setArticle(response.data)
                setInputFields(response.data.sections)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        handlePost(postId);
        setAuthor(username);
        confirmRole();
    }, [ postId, username, confirmRole ])

    const [ postTitle, setPostTitle ] = useState(article.postTitle);
    const [ linkTitle, setLinkTitle ] = useState(article.postTitle);
    const [ postDate, setPostDate ] = useState(article.postTitle);
    const [ thumbnail, setThumbnail ] = useState(article.postTitle);
    const [ postIntro, setPostIntro ] = useState(article.postTitle);
    const [ author, setAuthor ] = useState(article.author);
    const [inputFields, setInputFields] = useState([]);

    const handleUpdate = () => {
        axios.post(`${process.env.REACT_APP_UPDATE_POST_URL}/${postId}`, {
            // post heading
            postId: postId,
            author: author,
            postTitle: postTitle,
            linkTitle: linkTitle,
            postDate: postDate,
            thumbnail: thumbnail,
            postIntro: postIntro,
            sections: inputFields,
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

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ paragraph: '', title: '', image: '', link: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }};

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "paragraph") {
      values[index].paragraph = event.target.value;
    } else if(event.target.name === "title") {
      values[index].title = event.target.value;
    } else if (event.target.name === "image"){
        values[index].image = event.target.value;
    } else {
        values[index].link = event.target.value;
    }
    setInputFields(values);
  };

    const deletePost = () => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.delete(`${process.env.REACT_APP_DELETE_POST_URL}/${postId}`)
            .then(function(response){
                if(response.data !== "Post Deleted"){
                    setLoading(false);
                    alert("Server Error - Post not updated")
                } else {
                    setLoading(false);
                    alert('Post Deleted!');
                }
            })
        }
    }


    return (
        <StyledEditPage>
            {
                isLoading
                ? <h1>Loading</h1>
                : <div className="formWrapper">
                    <div id="intro">
                    <div className="info-container">
                        <div className="input-container">
                            <label>Post Title:
                                <input
                                    type="text"
                                    id="title"
                                    defaultValue={article.postTitle}
                                    onChange={(event) => {
                                        setPostTitle(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Title(Add '-' to Title):
                                <input
                                    type="text"
                                    id="linkTitle"
                                    defaultValue={article.linkTitle}
                                    onChange={(event) => {
                                        setLinkTitle(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Date:
                                <input 
                                    type="date" 
                                    id="date"
                                    defaultValue={article.postDate}
                                    onChange={(event) =>{
                                        setPostDate(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Thumbnail:
                                <input 
                                    type="text" 
                                    id="thumbnail"
                                    defaultValue={article.thumbnail}
                                    onChange={(event) =>{
                                        setThumbnail(event.target.value);
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <label className="paragraph-textarea">Intro Paragraph:
                        <textarea
                            id='intro'
                            defaultValue={article.postIntro}
                            onChange={(event) =>{
                                setPostIntro(event.target.value);
                            }}
                        />
                    </label>
                    </div>
                    { 
                        inputFields.map((section, index) => {
                                return (
                                    <div id="paragraph-section" key={index}>
                                        <div className="info-container">
                                            <div className="input-container">
                                                <label>Title
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        defaultValue={section.title}
                                                        onChange={event => handleInputChange(index, event)}
                                                    />
                                                </label>
                                                <label>Link
                                                    <input
                                                        type="text"
                                                        id="link"
                                                        name="link"
                                                        defaultValue={section.link}
                                                        onChange={event => handleInputChange(index, event)}
                                                    />
                                                </label>
                                                <label>Image
                                                    <input
                                                        type="text"
                                                        id="image"
                                                        name="image"
                                                        defaultValue={section.image}
                                                        onChange={event => handleInputChange(index, event)}
                                                    />
                                                </label>
                                            </div>
                                            <label>Paragraph
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    id="paragraph"
                                                    name="paragraph"
                                                    defaultValue={section.paragraph}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </label>
                                        </div>
                                        <div className="button-container">
                                            <StyledButton onClick={handleAddFields}>Add Paragraph</StyledButton >
                                            {
                                                inputFields.length === 1 
                                                ? <StyledButton  id="delete">Remove</StyledButton >
                                                : <StyledButton  id="delete" onClick={() => { handleRemoveFields(index) }}>Remove</StyledButton >
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
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
    h1 {
        font-size: 3em;
        margin: 1em 0;
    }
    .formWrapper {
        display: flex;
        flex-direction: column;
        background: lightgray;
        width: 100%;
        align-items: center;
        border-radius: 12px;
        #paragraph-section, #intro, #conclusion {
            border-bottom: 2px white solid;
            width: 95%;
            justify-content: space-between;
            flex-direction: column;
            display: flex;
            margin-bottom: 30px;
            .info-container {
                display: flex;
                position: relative;
                width: 100%;
                .input-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    input, button, textarea {
                        width: 300px;
                        height: 30px;
                        }
                        label {
                            display: flex;
                            flex-direction: column;
                            font-size: 1.5em;
                            margin: 10px;
                            textarea {
                                width: 400px;
                                height: 200px;
                            }
                        }
                    }
                }
                label {
                    display: flex;
                    flex-direction: column;
                    font-size: 1.5em;
                    margin: 10px;
                    height: 100%;
                    width: 50%;
                    textarea {
                        width: 400px;
                        height: 200px;
                    }
                }
            }
            #intro {
                flex-direction: row;
                .info-container {
                    flex-direction: column;
                }
            }
            .button-container {
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