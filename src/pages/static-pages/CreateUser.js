import { useState, useEffect } from 'react';
import axios from 'axios';

// functions
import { unauthorized } from '../../functions/Unauthorized';

// styled
import styled from 'styled-components';
import { StyledButton } from '../../Styled/Styled';

export default function CreateUser({role, confirmAdmin}) {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirm, setConfirm ] = useState("");
	const [ userRole, setUserRole ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ confirmEmail, setConfirmEmail ] = useState("");
	const [joinDate, setJoinDate ] = useState("");


 	useEffect(() => {
		const handleDate = () => {
			const current = new Date();
			const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()} @ ${current.getHours()}:${current.getMinutes()}`;
			setJoinDate(date);
		}
		setUserRole(process.env.REACT_APP_GUEST_SECRET);
		handleDate();
	}, [role, userRole]);

    const registerUser = () => {
		if (password !== confirm ) {
			alert("Passwords don't match");
		} else if (email !== confirmEmail ) {
			alert("Emails don't match")
		} else {
			
			axios.post(`${process.env.REACT_APP_REGISER_URL}`, {
				username: username,
				password: password,
				email: email,
				userRole: `${process.env.REACT_APP_GUEST_SECRET}`,
				joinDate: joinDate,
			})
			.then(function(response) {
				if(response.data !== "USER REGISTERED"){
					alert("Server Error - User was not created")
				} else {
					alert('User Created!');
				}
			})
		}
	}

	return (
		<StyledRegister>
			<h1>Register User</h1>
				<div className="form-wrapper">
					<label>Username:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<label>Email:</label>
					<input 
						type="email" 
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<label>Retype Email:</label>
					<input 
						type="email" 
						onChange={(event) => {
							setConfirmEmail(event.target.value);
						}}
					/>
					<label>Password:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
                    <label>Retype Password:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setConfirm(event.target.value);
						}}
					/>
					{
                        role === process.env.REACT_APP_ADMIN_SECRET ? (
                            <StyledButton type="submit" onClick={()=>{registerUser();}}>Create User</StyledButton>
                        ) : (    
                            <StyledButton type="submit" onClick={()=>{unauthorized();}}>Create User</StyledButton>
                        )
                    }
				</div>
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
		color: #0f4d92;
        margin-bottom: 40px;
    }
	.form-wrapper {
            display: flex;
            width: 90%;
            flex-direction: column;
            align-items: center;
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
        }
`;