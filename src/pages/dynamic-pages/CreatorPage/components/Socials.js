// styled
import styled from 'styled-components';

// images
import Linkedin from '../../../../images/linkedinBlack.png';
import Twitter from '../../../../images/twitterBlack.png';
import Insta from '../../../../images/instaBlack.png';
import Globe from '../../../../images/globe.png';
import Youtube from '../../../../images/youtube.png';
import Github from '../../../../images/githubBlack.png';

export default function Socials ({creator}) {

    return (
        <StyledSocials>
        {
            creator.twitter === "" 
            ? <></>
            : <a href={creator.twitter} target="_blank" rel="noreferrer"><img src={Twitter} alt="" /></a>  
        }
        {
            creator.youtube === "" 
            ? <></>
            :<a href={creator.youtube} target="_blank" rel="noreferrer"><img src={Youtube} alt="" /></a>
        }
        {
            creator.linkedin === "" 
            ? <></>
            : <a href={creator.linkedin} target="_blank" rel="noreferrer"><img src={Linkedin} alt="" /></a>
        }
        {
            creator.instagram === "" 
            ? <></>
            : <a href={creator.instagram} target="_blank" rel="noreferrer"><img src={Insta} alt="" /></a>
        }
        {
            creator.github === "" 
            ? <></>
            : <a href={creator.github} target="_blank" rel="noreferrer"><img src={Github} alt="" /></a>
        }
        {
            creator.other === "" 
            ? <></>
            : <a href={creator.other} target="_blank" rel="noreferrer"><img src={Globe} alt="" /></a>
        }
    </StyledSocials >
    )
}

const StyledSocials = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    @media (max-width: 450px){
        margin-top: 20px;
    }
    a {
        width: 35px;
        height: 35px;
        margin: 0 6px;
        img {
            height: 100%;
            width: 100%;
        }
    }  
`;