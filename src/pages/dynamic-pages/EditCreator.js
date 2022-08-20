import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import { StyledButton } from '../../Styled/StyledButton';
import * as pallette from '../../Styled/ThemeVariables.js';

// functions
import { unauthorized } from '../../functions/Unauthorized';
import { useConfirmAdmin } from '../../functions/ConfirmAdmin';

// router
import { useParams } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// loader
import Loader from '../../loaders/Loader';

export default function CreateCreator() {

    const user = useSelector((state) => state.user);

    const { username } = useParams();

    const confirm  = useConfirmAdmin(user.role);

    const [ creator, setCreator ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getCreator = () => {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_GET_CREATOR_URL}/${user.user}`)
            .then(function(response){
                setLoading(false);
                setCreator(response.data[0]);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });
        };
        if(confirm){
            getCreator();
        }
    }, [ user, username, confirm ])

    const [ creatorName, setCreatorName ] = useState(creator.creator);
    const [ twitter, setTwitter] = useState(creator.twitter);
	const [ linkedin, setLinkedin ] = useState(creator.linkedin);
	const [ instagram, setInstagram ] = useState(creator.instagram);
	const [ other, setOther ] = useState(creator.other);
	const [ bio, setBio ] = useState(creator.bio);
	const [ youtube, setYoutube ] = useState(creator.youtube);
    const [ avatar, setAvatar ] = useState(creator.avatar);
    const [ authorUsername, setAuthorUsername ] = useState(creator.authorUsername);
    const [ location, setLocation ] = useState(creator.location);
    const [ github, setGithub ] = useState(creator.github); 
    
    const handleUpdateCreator = () => {
        if(confirm){
            axios.post(`${process.env.REACT_APP_UPDATE_CREATOR_URL}/${creator._id}`, {
                creator: creatorName,
                authorUsername: authorUsername,
                avatar: avatar,
                twitter: twitter,
                linkedin: linkedin,
                instagram: instagram,
                youtube: youtube,
                github: github,
                other: other,
                bio: bio,
                location: location,
            })
            .then(function(response) {
                if(response.data !== "Creator Updated!"){
                    alert("Server Error - Creator was not created")
                } else {
                    alert('Creator Updated');
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

	return (
		<StyledRegister>
			<h1>Update Creator</h1>
			<div className="form-wrapper">
                {
                    isLoading
                    ? <Loader/>
                    : <>
                        <div className="left-container">
                            <label>Creator Name:</label>
                            <input 
                                defaultValue={creator.creator}
                                type="text" 
                                onChange={(event) => {
                                    setCreatorName(event.target.value);
                                }}
                            />
                            <label>Username:</label>
                            <input 
                                defaultValue={creator.authorUsername}
                                type="text" 
                                onChange={(event) => {
                                    setAuthorUsername(event.target.value);
                                }}
                            />
                            <label>Bio:</label>
                            <input 
                                defaultValue={creator.bio}
                                type="text" 
                                onChange={(event) => {
                                    setBio(event.target.value);
                                }}
                            />
                            <label>Location:</label>
                            <input 
                                defaultValue={creator.location}
                                type="text" 
                                onChange={(event) => {
                                    setLocation(event.target.value);
                                }}
                            />
                            <label>Avatar:</label>
                            <input 
                                defaultValue={creator.avatar}
                                type="text" 
                                onChange={(event) => {
                                    setAvatar(event.target.value);
                                }}
                            />
                        </div>
                        <div className="right-container">
                            <label>Twitter:</label>
                            <input 
                                defaultValue={creator.twitter}
                                type="text" 
                                onChange={(event) => {
                                    setTwitter(event.target.value);
                                }}
                            />
                            <label>Youtube</label>
                            <input 
                                defaultValue={creator.youtube}
                                type="text" 
                                onChange={(event) => {
                                    setYoutube(event.target.value);
                                }}
                            />
                            <label>Instagram:</label>
                            <input 
                                defaultValue={creator.instagram}
                                type="text" 
                                onChange={(event) => {
                                    setInstagram(event.target.value);
                                }}
                            />
                            <label>Linkedin:</label>
                            <input 
                                defaultValue={creator.linkedin}
                                type="text" 
                                onChange={(event) => {
                                    setLinkedin(event.target.value);
                                }}
                            />
                            <label>Github:</label>
                            <input 
                                defaultValue={creator.github}
                                type="text" 
                                onChange={(event) => {
                                    setGithub(event.target.value);
                                }}
                            />
                            <label>Other:</label>
                            <input
                                defaultValue={creator.other} 
                                type="text" 
                                onChange={(event) => {
                                    setOther(event.target.value);
                                }}
                            />
                        </div>
                    </>
                }
            </div>
            {
                user.role === process.env.REACT_APP_ADMIN_SECRET 
                ? <StyledButton type="submit" onClick={()=>{handleUpdateCreator();}}>Update Creator</StyledButton>
                : <StyledButton type="submit" onClick={()=>{unauthorized();}}>Register Creator</StyledButton>
            }
		</StyledRegister>
	)
}

const StyledRegister = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: white;
height: 80vh;
width: 100%;
max-width: 875px;
margin: 20px auto;
border-radius: 12px;
	@media (max-width: 1050px){
		width: 98%;
	}
	h1 {
		font-size: 3em;
		color: ${pallette.accentColor2};
        margin-bottom: 40px;
    }
	.form-wrapper {
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 1150px){
            font-size: 1.2em;
        }
        label {
            font-weight: bold;
            @media (max-width: 1150px){
                font-size: 1.2em;
            }
        }
        input {
            width: 200px;
            margin-bottom: 20px;
            border-radius: 4px;
            padding: 4px;
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
        .right-container, .left-container {
            display: flex;
            flex-direction: column;
        } 
    }
`;