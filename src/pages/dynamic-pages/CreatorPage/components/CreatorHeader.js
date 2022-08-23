// styled
import styled from 'styled-components';

// components
import Socials from './Socials.js';

// images
import Dot from "../../../../images/dot.png";

export default function CreatorHeader ({creator, articles}) {

    return (
        <StyledCreatorHeader>
            <div className="header-wrapper">
                <img id="avatar" src={creator.avatar} alt="" />
                <h4>{creator.creator}</h4>
                <p>{creator.bio}</p>
                <div className="info-container">
                    <h6>{creator.location}</h6>
                    <img className="dot" src={Dot} alt="" />
                    <h6>{articles.length} Posts</h6>
                    <img className="dot" id="dot2" src={Dot} alt="" />
                    <Socials
                        creator={creator}
                    />
                </div>
            </div>
    </StyledCreatorHeader >
    )
}

const StyledCreatorHeader = styled.header`
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    width: 95%;
    max-width: 875px;
    .header-wrapper {
        width: 70%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 10px;
        @media (max-width: 750px){
            width: 90%;
        }
        #avatar {
            width: 150px;
            margin: auto;
        }
        h4 {
            font-size: 1.5em;
            margin: auto;
        }
        p {
            font-size: 16px;
            margin: auto;
            @media (max-width: 750px){
                font-size: 13px;
            }
        }
        .info-container {
            display: flex;
            width: 100%;
            justify-content: space-evenly;
            align-items: center;
            margin: 10px auto;
            flex-wrap: wrap;
            h6 {
                margin: auto;
                font-size: 20px;
                @media (max-width: 750px){
                    font-size: 14px;
                }
            }
            .dot {
                width: 10px;
                @media (max-width: 750px){
                    width: 6px;
                }
            }
            #dot2 {
                @media (max-width: 450px){
                    display: none;
                }
            }
        }
    }  
`;