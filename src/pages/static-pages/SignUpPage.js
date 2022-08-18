import { useState, useEffect } from 'react';
import axios from 'axios';

// router
import { Link } from 'react-router-dom';

// styled
import styled from 'styled-components';
import { StyledButton } from '../../Styled/Styled';

export default function SignUpPage() {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirm, setConfirm ] = useState("");
	const [ userRole, setUserRole ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ confirmEmail, setConfirmEmail ] = useState("");
	const [ joinDate, setJoinDate ] = useState("");
	const [ robot, setRobot ] = useState("");
	const [ registered, setRegistered ] = useState(false);

 	useEffect(() => {
		const handleDate = () => {
			const current = new Date();
			const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
			setJoinDate(date);
		}
		setUserRole(process.env.REACT_APP_USER_SECRET);
		handleDate();
	}, [userRole])

    const registerUser = () => {
		if (password !== confirm ) {
			alert("Passwords do not match");
		} else if (email !== confirmEmail ) {
			alert("Emails do not match");
		} else if (robot !== "on" ) {
			alert("Check the Not a robot box");
		} else {
			axios.post(`${process.env.REACT_APP_REGISTER_URL}`, {
				username: username,
				password: password,
				email: email,
				userRole: `${process.env.REACT_APP_USER_SECRET}`,
				joinDate: joinDate,
			})
			.then(function(response) {
				if(response.data !== "USER REGISTERED"){
					alert("Server Error - User was not created")
				} else {
					alert('User Created!');
					setRegistered(true);
				}
			})
		}
	}

	return (
		<StyledSignUpPage>
			{
				!registered
				? <>
					<h1>Join the Commmunity!</h1>
					<div className="form-wrapper">
						<label>Username:</label>
						<input
							required 
							type="text" 
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
						<label>Email:</label>
						<input 
							required
							type="email" 
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
						<label>Retype Email:</label>
						<input 
							required
							type="email" 
							onChange={(event) => {
								setConfirmEmail(event.target.value);
							}}
						/>
						<label>Password:</label>
						<input 
							required
							type="text" 
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<label>Retype Password:</label>
						<input 
							type="text" 
							required
							onChange={(event) => {
								setConfirm(event.target.value);
							}}
						/>
						<label> Are you a robot?</label>
						<label>No
							<input 
								id="checkbox" 
								type="checkbox" 
								name="robot"
								required
								onChange={(event) => {
									setRobot(event.target.value);
								}}
							/>
						</label>
						<StyledButton type="submit" onClick={()=>{registerUser();}}>Sign Up</StyledButton>
					</div>
				</>
				: <>
					<h4>You are all signed up!</h4>
					<h4>Go ahead and log in!</h4>
					<Link to="/LoginPage">Log In</Link>
				</>
				
			}
		</StyledSignUpPage>
	)
}

const StyledSignUpPage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
    min-height: 60vh;
	margin: 20px auto;
    width: 95%;
    max-width: 875px;
	h1 {
		font-size: 2em;
		color: #d6d6d6;
		@media (max-width: 750px){
			font-size: 1.5em;
		}
	}
	.form-wrapper {
		margin-top: 40px;
		display: flex;
		width: 90%;
		flex-direction: column;
		align-items: center;
		@media (max-width: 1150px){
			font-size: 1.2em;
		}
		label {
			color: white;
			letter-spacing: 1px;
			width: 100%;
			max-width: 300px;
			@media (max-width: 1150px){
				font-size: 1.2em;
			}
		}
		input {
			width: 100%;
			max-width: 300px;
		}
		#checkbox {
			width: 30px;
			height: 20px;
		}
		button {
			background: white;
			color: black;
			&:hover {
				color: white;
				background: black;
			}
		}
	}
`;