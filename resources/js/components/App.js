import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import axios from 'axios';

import TopNav from './TopNav';
import BottomNav from './BottomNav';
import ScrollToTop from "./ScrollToTop"

import LoginPopUp from '../auth/LoginPopUp'
import Login from '../auth/Login'
import Register from '../auth/Register'

import Index from '../pages/Index'

import { random } from 'lodash';
require('lodash')
Object.keys(require.cache)

function App() {

	// console.log(process.env.MIX_APP_URL)

	const url = window.location.href.match(/https/) ?
		'https://pay.black.co.ke' :
		'http://localhost:8002'

	axios.defaults.baseURL = url

	// Function for checking local storage
	const getLocalStorage = (state) => {
		if (localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return []
		}
	}

	// Function to set local storage
	const setLocalStorage = (state, data) => {
		localStorage.setItem(state, JSON.stringify(data))
	}

	// Declare states
	const [login, setLogin] = useState()
	const [auth, setAuth] = useState(localStorage.getItem("auth") ?
		JSON.parse(localStorage.getItem("auth")) :
		{
			"name": "Guest",
			"email": "guest@gmail.com",
			"pp": "/storage/img/male_avatar.png",
			"account_type": "normal"
		})
	const [messages, setMessages] = useState([])
	const [errors, setErrors] = useState([])

	// Reset Messages and Errors to null after 3 seconds
	if (errors.length > 0 || messages.length > 0) {
		setTimeout(() => setErrors([]), 2900);
		setTimeout(() => setMessages([]), 2900);
	}

	// Fetch data once on page load
	useEffect(() => {
		axios.get('/api/home')
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err))
	}, [])

	console.log("rendered")

	/*
	*
	* Register service worker */
	if (window.location.href.match(/https/)) {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/sw.js')
				// .then((reg) => console.log('Service worker registered', reg))
				// .catch((err) => console.log('Service worker not registered', err));
			})
		}
	}

	/*
	*
	* PWA Install Btn */
	let deferredPrompt;
	var btnAdd = useRef()
	const [downloadLink, setDownloadLink] = useState();
	const [downloadLinkText, setDownloadLinkText] = useState("");

	// Listen to the install prompt
	window.addEventListener('beforeinstallprompt', (e) => {
		deferredPrompt = e;

		// Show the Btn
		setDownloadLink(true)

		// Action when Btn is clicked
		btnAdd.current.addEventListener('click', (e) => {
			// Show install banner
			deferredPrompt.prompt();
			// Check if the user accepted
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					setDownloadLinkText("User accepted")
				}
				deferredPrompt = null;
			});

			window.addEventListener('appinstalled', (evt) => {
				setDownloadLinkText("Installed")
			});
		});
	});

	const GLOBAL_STATE = {
		getLocalStorage, setLocalStorage,
		login, setLogin,
		url,
		auth, setAuth,
		messages, setMessages,
		errors, setErrors,
		// PWA
		btnAdd,
		downloadLink, setDownloadLink,
		downloadLinkText, setDownloadLinkText,
	}

	return (
		<Router>
			<TopNav {...GLOBAL_STATE} />

			<Route path="/login" exact render={(props) => (<Login {...GLOBAL_STATE} />)} />
			<Route path="/register/:name/:email/:avatar" exact render={(props) => (<Register {...GLOBAL_STATE} />)} />

			<Route path="/" exact render={(props) => (<Index {...GLOBAL_STATE} />)} />

			<BottomNav {...GLOBAL_STATE} />
		</Router>
	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
