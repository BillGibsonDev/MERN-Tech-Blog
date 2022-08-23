// styled
import styled from 'styled-components';
import { StyledButton } from '../../../../Styled/StyledButton';

export default function EditSection({
    section, 
    index, 
    inputFields, 
    handleInputChange,
    handleRemoveFields
}) {

    return (
        <StyledEditSection>
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
                        id="paragraph"
                        name="paragraph"
                        defaultValue={section.paragraph}
                        onChange={event => handleInputChange(index, event)}
                    />
                </label>
            </div>
            {
                inputFields.length === 1 
                ? <StyledButton  id="delete">Remove</StyledButton >
                : <StyledButton  id="delete" onClick={(index) => { handleRemoveFields(index) }}>Remove</StyledButton >
            }         
        </StyledEditSection>
    )
}

const StyledEditSection = styled.section`
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
            width: 50%;
            @media (max-width: 450px){
                width: 90%;
            }
            textarea {
                width: 400px;
                height: 200px;
                @media (max-width: 450px){
                    width: 90%;
                }
            }
        }
        button {
            margin: 10px 0;
        }
        #delete {
            background: #da4040;
            &:hover {
            background: red;
        }
    }
`;