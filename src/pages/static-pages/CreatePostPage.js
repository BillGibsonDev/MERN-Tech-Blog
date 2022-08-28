import { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';

// styled
import styled from 'styled-components';
import { StyledButton } from '../../Styled/StyledButton';
import * as pallette from '../../Styled/ThemeVariables.js';

// redux
import { useSelector } from 'react-redux';

// functions
import { useConfirmRole } from '../../functions/ConfirmRole';

export default function CreatePostPage() {

    const user = useSelector((state) => state.user);

    const confirm = useConfirmRole(user.role);

    const [ postTitle, setPostTitle ] = useState("");
    const [ linkTitle, setLinkTitle ] = useState("");
    const [ postDate, setPostDate ] = useState(0);
    const [ thumbnail, setThumbnail ] = useState('');
    const [ content, setContent ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ tag, setTag] = useState('');

    const handleSubmit = () => {
        if(confirm){
            axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ADD_POST_URL}`, {
                author: author,
                authorUsername: user.user,
                postTitle: postTitle,
                linkTitle: linkTitle,
                postDate: postDate,
                thumbnail: thumbnail,
                content: content,
                tag: tag,
            })
            .then(function(response){
                if(response.data === "Post Created"){
                    alert('Blog Post Added');
                } else {
                    alert('Error - Blog Post Not Added');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };

    return (
        <StyledCreatePage>
            <div className="form-wrapper">
                <section>
                    <div className="input-wrapper">
                        <div className="input-container">
                            <label>Tag:
                                <input
                                    type="text"
                                    id="tag"
                                    placeholder='Language focus'
                                    onChange={(event) => {
                                        setTag(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Author:
                                <input
                                    type="text"
                                    id="author"
                                    placeholder='Your Name Here'
                                    onChange={(event) => {
                                        setAuthor(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Title:
                                <input
                                    type="text"
                                    id="title"
                                    placeholder='Great Article Title'
                                    onChange={(event) => {
                                        setPostTitle(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Post Title(Add '-' to Title):
                                <input
                                    type="text"
                                    id="linkTitle"
                                    placeholder='Great-Article-Title'
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
                                    placeholder='Imgur links only!'
                                    onChange={(event) =>{
                                        setThumbnail(event.target.value);
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <label>Content:
                        <textarea
                            id='intro'
                            onChange={(event) =>{
                                setContent(event.target.value);
                            }}
                        />
                    </label>
                </section>
                <div className="button-wrapper">
                    <StyledButton onClick={() => { handleSubmit() }}>Submit</StyledButton>
                </div>

                <div className="content-container"
                    dangerouslySetInnerHTML={{
                        __html: marked(content),
                    }}
                >
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
        section {
            border-bottom: 2px white solid;
            width: 95%;
            justify-content: space-between;
            flex-direction: column;
            display: flex;
            margin-bottom: 30px;
            .input-wrapper {
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
                    width: 100%;
                    height: 300px;
                    @media (max-width: 450px){
                        width: 90%;
                    }
                }
            }
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
    .content-container {
        width: 90%;
        margin: auto;
        ul {
            list-style: square inside;
        }
        img {
            width: 100%;
            margin-bottom: 10px;
        }
        p, li {
            font-size: 1rem;
            margin-bottom: 1.5em;
            letter-spacing: 1px;
            line-height: 1.7;
            color: #fff;
        }
        a {
            color: #9acdff;
            font-size: 1rem;
            text-decoration: underline;
        }
        h4 {
            color: ${pallette.titleColor};
            margin: 30px 0 6px 0;
            font-size: 2.5rem;
        }
        h5 {
            color: ${pallette.titleColor};
            margin: 10px 0;
            font-size: 2rem;
        }
        h6 {
            color: ${pallette.titleColor};
            margin: 10px 0 6px 0;
            font-size: 1.5rem;
        }
        code {
            display: flex;
            background: white;
            padding: 10px;
            font-size: 1rem;
            margin: 10px 0;
            white-space: pre-wrap;
        }
    }
`;