import styled from "styled-components";
import * as pallette from './ThemeVariables.js';

export const StyledButton = styled.button`
    width: 200px;
    letter-spacing: 1px;
    height: 35px;
    cursor: pointer;
    margin: 0 20px;
    color: #ffffff;
    font-size: 16px;
    background: ${pallette.accentColor2};
    border: none;
    border-radius: 4px;
    font-weight: 700;
    @media (max-width: 1150px){
        font-size: 1.2em;
    }
    &:hover{
        cursor: pointer;
        background: #7e7e7e;
        transition: 0.2s;
        transform: scale(1.01);
    }
`;