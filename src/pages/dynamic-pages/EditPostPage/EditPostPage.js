import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import { StyledButton } from '../../../Styled/StyledButton';

// router
import  { useParams } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// components
import EditSection from './components/EditSection.js';
import EditIntro from './components/EditIntro';

export default function EditPostPage() {

    const { postId } = useParams();

    const user = useSelector((state) => state.user );

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
    }, [ postId, user ])

    const [ postTitle, setPostTitle ] = useState(article.postTitle);
    const [ linkTitle, setLinkTitle ] = useState(article.postTitle);
    const [ postDate, setPostDate ] = useState(article.postTitle);
    const [ thumbnail, setThumbnail ] = useState(article.postTitle);
    const [ postIntro, setPostIntro ] = useState(article.postTitle);
    const [ inputFields, setInputFields ] = useState([]);

    const handleUpdate = () => {
        axios.post(`${process.env.REACT_APP_UPDATE_POST_URL}/${postId}`, {
            postId: postId,
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

    const handleRemoveFields = (index) => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result){
            const values = [...inputFields];
            values.splice(index, 1);
            setInputFields(values);
            console.log(values)
        }
    };

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
                : <div className="form-wrapper">
                    <EditIntro
                        article={article}
                        setLinkTitle={setLinkTitle}
                        setPostDate={setPostDate}
                        setThumbnail={setThumbnail}
                        setPostIntro={setPostIntro}
                        setPostTitle={setPostTitle}
                    />
                    { 
                        inputFields.map((section, index) => {
                            return (
                                <EditSection
                                    section={section}
                                    key={index}
                                    index={index}
                                    inputFields={inputFields}
                                    setInputFields={setInputFields}
                                    handleInputChange={handleInputChange}
                                    handleRemoveFields={handleRemoveFields}
                                />
                            )
                        })
                    }
                    <StyledButton onClick={() => { handleAddFields() }}>Add Paragraph</StyledButton >
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
        background: lightgray;
        width: 100%;
        align-items: center;
        border-radius: 12px;
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