// styled
import styled from 'styled-components';
import * as pallette from '../Styled/ThemeVariables.js';

// router
import { Link } from 'react-router-dom';

export default function Filter() {

  let buttons = document.getElementsByClassName("filter");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }

  return (
    <StyledFilter>
        <Link className="filter" id="html" to="/articles/HTML">HTML</Link>
        <Link className="filter" id="css" to="/articles/CSS">CSS</Link>
        <Link className="filter" id="javascript" to="/articles/JavaScript">JavaScript</Link>
        <Link className="filter" id="react" to="/articles/React">React</Link>
        <Link className="filter" id="apis" to="/articles/Apis">APIs</Link>
    </StyledFilter>
  )
}

const StyledFilter = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  @media(max-width: 1250px){
    width: 90%;
  }
  @media(max-width: 700px){
    width: 95%;
    flex-wrap: wrap;
    justify-content: center;
  }
  a {
    color: ${pallette.helperGrey};
    font-size: 20px;
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
      color: white;
    }
    @media(max-width: 700px){
      margin: 0 10px;
    }
  }
  .active {
    font-weight: 700;
    color: white;
    text-decoration: underline;
    text-underline-position: under;
  }
`;