// styled
import styled from 'styled-components';
import * as pallette from '../../../../Styled/ThemeVariables.js';

// router
import { Link } from 'react-router-dom';

//images
import Edit from '../../../../images/editIconWhite.png';

// redux
import { useSelector } from 'react-redux';

export default function Intro({article, splitDate, creator, postId}) {

    const user = useSelector((state) => state.user );
    
    return (
        <StyledIntro>
            <div className="title-container">
                <h4>{article.postTitle}</h4>
                <div className="icon-container">
                    <Link id="tag-link" to={`/articles/${article.tag}`}>#{article.tag}</Link>
                    <div className="button-container">
                        {
                            user.role === process.env.REACT_APP_ADMIN_SECRET || user.user === article.authorUsername 
                            ? <Link to={`/EditPostPage/${postId}`}><img id="edit" src={Edit} alt="" /></Link>
                            : <></>
                        }
                    </div> 
                </div>
            </div>
            <img id="thumbnail" src={article.thumbnail} alt="" />
            <div className="info-container">
                <div className="author-container">
                    <img src={creator.avatar} alt="" />
                    <Link to={`/creators/${article.authorUsername}`}>{article.author}</Link>
                </div>
                <h5>{splitDate}</h5>
            </div>
            {
                article.postIntro === '' 
                ? <></>
                : <p id="intro-para">{article.postIntro}</p>
            }
                        
        </StyledIntro>
    )
}

const StyledIntro = styled.section`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    border-radius: 20px;
    .title-container {
        width: 100%;
        height: 100%;
        margin: 10px auto;
        h4 {
            font-size: 30px;
            margin-bottom: 10px;
            color: #ffffff;
            @media (max-width: 750px){
                font-size: 1.5em;
            }
        }
        .icon-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 300px;
            margin-bottom: 10px;
            @media (max-width: 750px){
                width: 100%;
                margin-bottom: 20px; 
            }
            a {
                display: flex;
                align-items: center;
                font-size: 18px;
                color: ${pallette.helperGrey};
                #edit {
                    width: 25px;
                    margin-right: 20px;
                }
            }
            .button-container {
                display: flex;
                img {
                    width: 25px;
                    cursor: pointer;
                }
            }
        }
    }
    #thumbnail {
        width: 100%;
        max-width: 900px;
    }
    .info-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 10px 0 10px 0;
        .author-container {
            display: flex;
            width: 110px;
            justify-content: space-between;
            align-items: center;
            img {
                height: 30px;
                width: 30px;
                border-radius: 50%;
                object-fit: cover;
            }
            a {
                font-size: 16px;
                color: ${pallette.helperGrey};
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        h5 {
            color: ${pallette.helperGrey};
            font-weight: 400;
        }
    }
    #intro-para {
        color: ${pallette.helperGrey};
        margin-bottom: 20px;
        font-weight: 400;
        font-size: 20px;
    }
    
`;