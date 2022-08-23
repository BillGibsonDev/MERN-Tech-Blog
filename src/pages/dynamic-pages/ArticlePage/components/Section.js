// styled
import styled from 'styled-components';
import * as pallette from '../../../../Styled/ThemeVariables.js';

export default function Section({section}) {

    return (
        <StyledSection>
            {
                section.title === ""
                ? <></>
                : <h6>{section.title}</h6>
            }
            {
                section.image === ""
                ? <></>
                : <img src={section.image} alt='' />
            }
            {
                section.paragraph === ""
                ? <></>
                : <p>{section.paragraph}</p>
            }
            {
                section.link === ""
                ? <></>
                : <a href={section.link} target="_blank" rel="noreferrer">{section.link}</a>
            }                
        </StyledSection>
    )
}

const StyledSection = styled.section`
    img {
        width: 100%;
    }
    p {
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
    h6 {
        color: #ffffff;
        font-size: 24px;
        margin: 10px 0 6px 0;
        @media (max-width: 750px){
            font-size: 1.5em;
        }
    }
        
    
`;