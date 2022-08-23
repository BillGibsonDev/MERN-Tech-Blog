import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import { StyledButton } from '../../Styled/StyledButton';

// redux
import { useSelector } from 'react-redux';

// functions
import { useConfirmRole } from '../../functions/ConfirmRole';

export default function CreatePostPage() {

    const user = useSelector((state) => state.user);

    const confirm = useConfirmRole(user.role)

    const [ postTitle, setPostTitle ] = useState("");
    const [ linkTitle, setLinkTitle ] = useState("");
    const [ postDate, setPostDate ] = useState(0);
    const [ thumbnail, setThumbnail ] = useState('');
    const [ postIntro, setPostIntro ] = useState('');
    const [ author, setAuthor ] = useState('');

    const [inputFields, setInputFields] = useState([
        { 
            paragraph: '', 
            title: '', 
            image: '', 
            link: '' ,
        }
    ]);

    const handleSubmit = () => {
        if(confirm){
            axios.post(`${process.env.REACT_APP_ADD_POST_URL}`, {
                author: author,
                authorUsername: user.user,
                postTitle: postTitle,
                linkTitle: linkTitle,
                postDate: postDate,
                thumbnail: thumbnail,
                postIntro: postIntro,
                sections: inputFields
            })
            .then(function(response){
                if(response === "Post Created"){
                    alert('Blog Post Added');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ paragraph: '', title: '', image: '', link: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
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

    const clearForm = () =>{
        window.location.reload();
        alert('Form Cleared')
    }

    return (
        <StyledCreatePage>
            <div className="form-wrapper">
                <section id="intro">
                    <div className="info-container">
                        <div className="input-container">
                            <label>Author:
                                <input
                                    type="text"
                                    id="author"
                                    onChange={(event) => {
                                        setAuthor(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Title:
                                <input
                                    type="text"
                                    id="title"
                                    onChange={(event) => {
                                        setPostTitle(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Title(Add '-' to Title):
                                <input
                                    type="text"
                                    id="linkTitle"
                                    onChange={(event) => {
                                        setLinkTitle(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Date:
                                <input 
                                    type="date" 
                                    id="date"
                                    onChange={(event) =>{
                                        setPostDate(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Thumbnail:
                                <input 
                                    type="text" 
                                    id="thumbnail"
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
                            onChange={(event) =>{
                                setPostIntro(event.target.value);
                            }}
                        />
                    </label>
                </section>
                {
                    inputFields.map((inputField, index) => {
                        return (
                            <section id="paragraph-section" key={index}>
                                <div className="info-container">
                                    <div className="input-container">
                                        <label>Title
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={inputField.title}
                                                onChange={event => handleInputChange(index, event)}
                                            />
                                        </label>
                                        <label>Link
                                            <input
                                                type="text"
                                                id="link"
                                                name="link"
                                                value={inputField.link}
                                                onChange={event => handleInputChange(index, event)}
                                            />
                                        </label>
                                        <label>Image
                                            <input
                                                type="text"
                                                id="image"
                                                name="image"
                                                value={inputField.image}
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
                                            value={inputField.paragraph}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </label>
                                </div>
                                <div className="button-container">
                                    <button onClick={handleAddFields}>Add Paragraph</button>
                                    {
                                        inputFields.length === 1 
                                        ? <button>Remove</button>
                                        : <button onClick={(index) => { handleRemoveFields(index) }}>Remove</button>
                                    }
                                </div>
                            </section>
                        )
                    })
                }
                <div className="button-wrapper">
                    <StyledButton onClick={() => { handleSubmit() }}>Submit</StyledButton>
                    <StyledButton id="clear" onClick={() => { clearForm() }}>Clear</StyledButton>
                </div>
            </div>
        </StyledCreatePage>
    )
}

const StyledCreatePage = styled.div`
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
    .form-wrapper {
        display: flex;
        flex-direction: column;
        background: lightgray;
        width: 100%;
        align-items: center;
        border-radius: 12px;
        #paragraph-section, #intro {
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
                @media (max-width: 750px){
                    flex-direction: column;
                }
                .input-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
            }
            label {
                display: flex;
                flex-direction: column;
                font-size: 1.5em;
                margin: 10px;
                height: 100%;
                width: 90%auto;
                textarea {
                    width: 400px;
                    height: 200px;
                    @media (max-width: 450px){
                        width: 90%;
                    }
                }
            }
            .button-container {
                display: flex;
                width: 100%;
                justify-content: space-between;
                margin-bottom: 20px;
                button {
                    padding: 6px 10px;
                    font-weight: 700;
                    border-radius: 6px;
                    border: none;
                    background: black;
                    color: white;
                    cursor: pointer;
                }
            }
        }
        #intro {
            flex-direction: row;
            @media (max-width: 750px){
                flex-direction: column;
            }
            .info-container {
                flex-direction: column;
            }
        }
        .button-wrapper {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 10px;
            #clear {
                opacity: .6;
                background: #ff0800;
                &:hover{
                    background: #fa0000;
                    opacity: 1;
                }
            }
        }
    }
`;