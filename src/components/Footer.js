// styled
import styled from 'styled-components';

//router
import { Link } from 'react-router-dom';

// images
import Twitter from '../images/twitterBlack.png';
import Linkedin from '../images/linkedinBlack.png';
import Github from '../images/githubBlack.png';
import Globe from '../images/globe.png';

export const Footer = () => { 
    return (
        <StyledFooter>
            <div className="icon-container">
                <a href="https://twitter.com/GibbyBreaksTech" target="_blank" rel="noreferrer">
                    <img src={Twitter} alt="" />
                </a>
                <a href="https://www.linkedin.com/in/bill-gibson-868182104/" target="_blank" rel="noreferrer">
                    <img src={Linkedin} alt="" />
                </a>
                <a href="https://github.com/GibbyBreaksTech" target="_blank" rel="noreferrer">
                    <img src={Github} alt="" />
                </a>
                <a href="https://billgibson.net" target="_blank" rel="noreferrer">
                    <img src={Globe} alt="" />
                </a>
            </div>
            <div className="link-container">
                <Link to="/">Home</Link>
                <Link to="/About">About</Link>
                <Link to="/Contact">Contact</Link>
            </div>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    margin: 20px auto 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid white;
    flex-direction: column;
    max-width: 875px;
    width: 100%;
    margin: auto auto 40px auto;
    @media (max-width: 750px){
        width: 95%;
    }
    .icon-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 200px;
        margin: 20px auto 20px auto; 
        a {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            &:hover {
                background: white;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .link-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 80%;
        max-width: 400px;
        @media (max-width: 1050px){
            margin-top: 10px;
        }
        a {
            display: flex;
            justify-content: center;
            width: 100%;
            font-size: 14px;
            color: white;
            &:hover {
                text-decoration: underline;
            }
        }
    }

`;
