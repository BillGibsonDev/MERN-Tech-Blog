// styled
import styled from 'styled-components';

export default function About () {
    return (
        <StyledAbout >
            <div className="about-wrapper">
                <h1>About Tech Blog</h1>
                <p>Tech Blog is dedicated giving creators a place to create content for programming technologies.</p>
            </div>
        </StyledAbout >
    )
}

const StyledAbout = styled.div`
    width: 100%;
    min-height: 50vh;
    max-width: 875px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    @media (max-width: 750px){
        width: 95%;
    }
    .about-wrapper {
        width: 95%;
        margin: 20px auto;
        padding: 1em 0;
        h1 {
            display: flex;
            justify-content: center;
            width: 50%;
            margin: 10px auto;
            font-size: 2.5em;
            color: #ebebeb;
            border-bottom: 2px #ebebeb solid;
        }
        #bottomHeader {
            margin-top: 50px;
        }
        p {
            color: #fff;
            font-size: 1.5em;
            #bold {
                font-weight: 700;
            }
        }
        #thanks {
            display: flex;
            flex-direction: column;
            span {
                margin-top: 6px;
            }
        }
    }
`;