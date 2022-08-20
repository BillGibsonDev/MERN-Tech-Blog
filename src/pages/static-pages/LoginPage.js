// styled
import styled from 'styled-components';
import { StyledButton } from '../../Styled/StyledButton';

// loader
import Loader from '../../loaders/Loader';

export default function LoginPage({
	login, 
	setUsername, 
	setPassword, 
	handleTokens, 
	isLoading
 }) {

	return (
		<StyledLoginPage>
			<h3>Log In</h3>
			{
				isLoading 
				? <Loader />
				: <div className="form-wrapper">
					<label>Username:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<label>Password:</label>
					<input 
						type="password" 
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
					<StyledButton type="submit" onClick={() =>{ login(); handleTokens(); }}>Sign In</StyledButton>
				</div>
			}
		</StyledLoginPage>
	)
}

const StyledLoginPage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 95%;
    min-height: 40vh;
    max-width: 875px;
	margin: 20px auto;
	h3 {
		font-size: 2em;
		margin-bottom: 20px;
		color: #ffffff;
	}
	.form-wrapper {
		display: flex;
		width: 50%;
		flex-direction: column;
		align-items: center;
		label {
			color: white;
			width: 100%;
			max-width: 300px;
		}
		input {
			margin-bottom: 20px;
			width: 100%;
			max-width: 300px;
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