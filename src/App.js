import { useState, useEffect } from 'react';
import axios from 'axios';

// styles
import GlobalStyles from "./GlobalStyles";

// react router
import { Route, Routes, useNavigate } from 'react-router-dom';

// static pages
import HomePage from "./pages/static-pages/HomePage";
import AboutPage from './pages/static-pages/AboutPage';
import ContactPage from './pages/static-pages/ContactPage';
import CreateUser from "./pages/static-pages/CreateUser.js";
import CreatePostPage from "./pages/static-pages/CreatePostPage";
import LoginPage from "./pages/static-pages/LoginPage.js";
import SignUpPage from "./pages/static-pages/SignUpPage.js";
import ProfilePage from "./pages/static-pages/ProfilePage";
import CreateCreator from './pages/static-pages/CreateCreator.js';

// dynamic pages
import CreatorPage from './pages/dynamic-pages/CreatorPage';
import ArticlePage from "./pages/dynamic-pages/ArticlePage.js";
import EditPostPage from "./pages/dynamic-pages/EditPostPage";
import FilteredSearchPage from './pages/dynamic-pages/FilteredSearchPage';

// legal pages
import PolicyPage from './pages/legal-pages/PolicyPage.js';
import TermsPage from './pages/legal-pages/TermsPage.js';

// components
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

function App() {

  	const [ password, setPassword ] = useState('');
  	const [ username, setUsername] = useState('');
	const [ isLoggedIn, setLoggedIn ] = useState(false);
	const [ role, setRole ] = useState("");
	const [ lastLogin, setLastLogin ] = useState("");
	const [ isLoading, setLoading ] = useState(false);

  	const navigate = useNavigate();

	const handleTokens = () => {
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		if (tokenPW === null) {
			navigate("/");
		} else {
			tokenPW = password;
			tokenUser = username;
		}
		// Update session storage
		sessionStorage.setItem("tokenPW", tokenPW);
		sessionStorage.setItem("tokenUser", tokenUser);
	}

  	useEffect(() =>{
		const handleDate = () => {
			const current = new Date();
			const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()} @ ${current.getHours()}:${current.getMinutes()}`;
			setLastLogin(date);
		}
		handleDate();
		handleRefresh();
		// eslint-disable-next-line
	},[])

	const login = () => {
		setLoading(true)
		axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
			username: username,
			password: password,
			lastLogin: lastLogin,
		})
		.then(function(response){
			setLoggedIn(true);
			setLoading(false);
			handleTokens();
			if (response.data === "LOGGED IN"){
				axios.post(`${process.env.REACT_APP_SET_ROLE_URL}`, {
					username: username, 
					password: password,
				})
				.then((response) => {
					setRole(response.data);
				})
				.catch((error) => {
					console.log(error);
				})
			} else {
				alert("Wrong Username or Password");
			}
		})
		.catch(function (error) {
			alert("Wrong Username or Password")
			console.log(error);
			setLoading(false);
		});
	}

	const logout = () => {
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload();
		setLoggedIn(false);
		setUsername("");
		setPassword('');
		setUsername("");
		navigate("/");
	}

	const confirmAdmin = () => {
		axios.post(`${process.env.REACT_APP_ADMIN_CONFIRM_URL}`, {
			role: role,
		})
		.then(function(response){
			if (response.data !== "Role Confirmed"){
				alert("You do not have this permission!");
				localStorage.clear();
				sessionStorage.clear();
				window.location.reload();
				setLoggedIn(false);
				navigate("/LoginPage");
			} 
		})
	}

	const confirmRole = () => {
		axios.post(`${process.env.REACT_APP_ROLE_CONFIRM_URL}`, {
			role: role,
		})
		.then(function(response){
			if (response.data !== "Role Confirmed" ){
				alert("Role was not confirmed");
				localStorage.clear();
				sessionStorage.clear();
				window.location.reload();
				setLoggedIn(false);
				navigate("/");
			}
		})
	}

	const handleRefresh = () => {
		setLoggedIn(true)
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		if (tokenPW === null && tokenUser === null) {
			setLoggedIn(false);
		} else {
			axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
			username: tokenUser,
			password: tokenPW,
		})
		.then(function(response){
			let tokenPW = sessionStorage.getItem("tokenPW");
			let tokenUser = sessionStorage.getItem("tokenUser");
			setUsername(tokenUser)
			if (response.data === "LOGGED IN"){
				axios.post(`${process.env.REACT_APP_SET_ROLE_URL}`, {
					username: tokenUser, 
					password: tokenPW,
				})
				.then((response) => {
					setRole(response.data)
					setLoggedIn(true);
				})
			}
		})
		.catch(function (error) {
			throw error;
		});
	}}

  return (
    <>
      	<GlobalStyles />
        <Nav
			logout={logout}
			isLoggedIn={isLoggedIn}
			username={username}
			role={role}
			confirmAdmin={confirmAdmin}
        />
        <Routes>
			<Route 
				path='/' exact 
				element={
					<HomePage
						username={username}
					/>
				}
			/> 
			<Route 
				path="/About" exact 
				element={
					<AboutPage
						username={username}
					/>
				}
			/>
			<Route 
				path="/Contact" exact
				element={
					<ContactPage />
				} 
			/>
			<Route 
				path="/Policies" exact
				element={ <PolicyPage />}
			/>
			<Route 
				path="/Termsofservice" exact
				element={ <TermsPage /> }
			/>
			<Route 
				path="/CreatePostPage" exact
				element={
					<CreatePostPage
						username={username}
						role={role}
						confirmRole={confirmRole}
					/>
				}
			/>
			<Route 
				path="/EditPostPage/:postId" exact
				element={
					<EditPostPage
						username={username}
						role={role}
						confirmRole={confirmRole}
					/>
				}
			/>
			<Route 
				path="/CreateUser" exact
				element={
					<CreateUser
						role={role}
						confirmRole={confirmRole}
					/>
				}
			/>
			<Route 
				path="/CreateCreator" exact
				element={
					<CreateCreator
						role={role}
						confirmRole={confirmRole}
						confirmAdmin={confirmAdmin}
					/>
				}
			/>
			<Route 
				path="/SignUpPage" exact
				element={
					<SignUpPage />
				}
			/>
			<Route 
				path="/LoginPage" exact
				element={
					<LoginPage
						login={login}
						setUsername={setUsername}
						setPassword={setPassword}
						handleTokens={handleTokens}
						isLoading={isLoading}
					/>
				}
			/>
			<Route 
				path="/creators/:authorUsername" exact
				element={
					<CreatorPage />
				}
			/>
			<Route 
				path="/ProfilePage" exact
				element={
					<ProfilePage
						username={username}
						role={role}
					/>
				}
			/>
			<Route 
				path="/post/:linkTitle/:id" exact
				element={
					<ArticlePage
						username={username}
						role={role}
						isLoggedIn={isLoggedIn}
					/>
				}
			/>
			<Route 
				path="/articles/:tag" exact
				element={
					<FilteredSearchPage
						username={username}
						role={role}
						isLoggedIn={isLoggedIn}
					/>
				}
			/>
        </Routes>
      <Footer />
    </>
  );
}

export default App;
