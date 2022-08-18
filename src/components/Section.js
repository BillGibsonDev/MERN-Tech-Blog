
// styled
import styled from 'styled-components';

export default function CreatePostPage(
    handleAddFields,
    handleInputChange,
    handleRemoveFields,
    index,
    title,
    paragraph,
    link,
    image,
) {

    return (
        <StyledSection>
            <div className="info-container">
                <div className="input-container">
                    <label>Title
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={event => handleInputChange(index, event)}
                    /></label>
                    <label>Link
                        <input
                            type="text"
                            id="link"
                            name="link"
                            value={link}
                            onChange={event => handleInputChange(index, event)}
                    /></label>
                    <label>Image
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={image}
                            onChange={event => handleInputChange(index, event)}
                    /></label>
                </div>
                <label>Paragraph
                    <textarea
                        type="text"
                        className="form-control"
                        id="paragraph"
                        name="paragraph"
                        value={paragraph}
                        onChange={event => handleInputChange(index, event)}
                /></label>
            </div>
            <div className="button-container">
                <button onClick={() =>{ handleAddFields(); }}>Add Paragraph</button>
                <button onClick={() =>{ handleRemoveFields(index); }}>Remove</button>
            </div>
        </StyledSection>
    )
}

const StyledSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
min-height: 100vh;
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
        #paragraph, #intro, #conclusion {
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
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    input, button, textarea {
                        width: 300px;
                        height: 30px;
                        }
                        label {
                            font-size: 1.5em;
                            margin: 10px 0;
                        }
                    }
                }
            .button-container {
                display: flex;
                width: 100%;
                justify-content: space-between;
                button {
                    padding: 0 6px;
                    border-radius: 6px;
                    border: none;
                    background: lightblue;
                    color: white;
                }
            }
            label {
                display: flex;
                flex-direction: column;
                font-size: 1.5em;
                margin: 10px;
            }
            textarea {
                width: 400px;
                height: 200px;
            }
        }
        #intro, #conclusion {
            flex-direction: row;
            .info-container {
                flex-direction: column;
            }
        }
    button{
        margin: 12px;
        font-size: 1.5em;
        height: 40px;
        background: lightgreen;
        cursor: pointer;
        &:hover{
            transition: 0.3s;
            transform: scale(1.1);
            background: white;
        }
    }
    #clear {
        opacity: .6;
        background: lightgoldenrodyellow;
        &:hover{
            background: white;
            opacity: 1;
        }
    }
}

`;