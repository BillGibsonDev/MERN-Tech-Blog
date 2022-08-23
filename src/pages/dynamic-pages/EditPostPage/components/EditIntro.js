// styled
import styled from 'styled-components';

export default function EditIntro({
    article, 
    setLinkTitle, 
    setPostDate, 
    setContent, 
    setThumbnail,
    setPostTitle,
    setTag
}) {

    return (
        <StyledEditIntro>
            <div className="info-container">
                <div className="input-container">
                    <label>Tag:
                        <input
                            type="text"
                            id="tag"
                            defaultValue={article.tag}
                            onChange={(event) => {
                                setTag(event.target.value);
                            }}
                        />
                    </label>
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
                <label>Content:
                    <textarea
                        id='content'
                        defaultValue={article.content}
                        onChange={(event) =>{
                            setContent(event.target.value);
                        }}
                    />
                </label>
            </div>
        </StyledEditIntro>
    )
}

const StyledEditIntro = styled.div`
    border-bottom: 2px white solid;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    margin-bottom: 30px;
    .info-container {
        display: flex;
        position: relative;
        width: 100%;
        flex-direction: column;
        .input-container {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        label {
            display: flex;
            flex-direction: column;
            font-size: 1.5em;
            margin: 10px;
            height: 100%;
            width: 90%;
            color: white;
            textarea {
                width:100%;
                height: 300px;
                @media (max-width: 450px){
                    width: 90%;
                }
            }
        }
    }
`;