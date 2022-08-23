import { createGlobalStyle } from "styled-components";

import * as pallette from './Styled/ThemeVariables.js'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        margin: auto;
        scroll-behavior: smooth;
        width: 90%;
        background: ${pallette.accentColor};
        font-family: 'Oswald', sans-serif;
        letter-spacing: .5px;
        line-height: 1.5;
        @media (max-width: 1220px){
            width: 90%
        }
        @media (max-width: 750px){
            width: 100%;
        } 
    }
    ul {
        list-style-type: none;
    }
    a {
        text-decoration: none;
    }
    textarea, input {
        padding: 4px;
    }
    input {
        height: 30px;
        border-radius: 4px;
        background: white;
        @media (max-width: 1150px){
            width: 50%;
        }
        @media (max-width: 750px){
            width: 70%;
        }
        @media (max-width: 550px){
            width: 90%;
        }
    }
`;

export default GlobalStyles;