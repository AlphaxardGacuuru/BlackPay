import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import TopnavLinks from "./TopNavLinks"
import Img from "./Img"

import CloseSVG from '../svgs/CloseSVG'
import LogoutSVG from '../svgs/LogoutSVG'
import DownloadSVG from '../svgs/DownloadSVG'
import PrivacySVG from '../svgs/PrivacySVG'

const TopNav = (props) => {

	axios.defaults.baseURL = props.url

	const [menu, setMenu] = useState("")

	const location = useLocation()

	const [bottomMenu, setBottomMenu] = useState("")
	const [avatarVisibility, setAvatarVisibility] = useState("none")
	const [notificationVisibility, setNotificationVisibility] = useState("none")
	const [notifications, setNotifications] = useState(props.getLocalStorage("notifications"))

	useEffect(() => {
		// Fetch Notifications
		// axios.get(`/api/notifications`)
		// 	.then((res) => {
		// 		setNotifications(res.data)
		// 		props.setLocalStorage("notifications", res.data)
		// 	}).catch(() => props.setErrors(['Failed to fetch notifications']))
	}, [])

	const logout = (e) => {
		e.preventDefault()

		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/logout`)
				.then((res) => {
					// Remove phone from localStorage
					localStorage.removeItem("auth")
					props.setMessages(["Logged out"])
					// Update Auth
					props.setAuth({
						"name": "Guest",
						"email": "guest@gmail.com",
						"profile_picture": "/storage/img/male_avatar.png",
						"phone": "0700364446"
					})
				});
		})
	}

	const onNotification = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.put(`${props.url}/api/notifications/update`)
				.then((res) => {
					// Update notifications
					axios.get(`${props.url}/api/notifications`)
						.then((res) => setNotifications(res.data))
				})
		})
	}

	const onDeleteNotifications = (id) => {
		axios.delete(`${props.url}/api/notifications/${id}`)
			.then((res) => {
				// Update Notifications
				axios.get(`${props.url}/api/notifications`)
					.then((res) => setNotifications(res.data))
			})
	}

	var display

	// Hide TopNav from various pages
	location.pathname.match("/privacy-policy") ||
		location.pathname.match("/download-app") ||
		location.pathname.match("/referral") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register") ?
		display = "none" : display = ""

	return (
		<>
			<div id="MyElement" style={{ display: display }} className={menu}>
				{/* <!-- ***** Main Menu Area Start ***** --> */}
				<div className="mainMenu d-flex align-items-center justify-content-between">
					{/* <!-- Close Icon --> */}
					<div className="closeIcon" onClick={() => setMenu("")}>
						<svg xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							fill="currentColor"
							className="bi bi-x"
							viewBox="0 0 16 16">
							<path
								d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
						</svg>
					</div>
					{/* <!-- Logo Area --> */}
					<div className="logo-area">
						<Link to="/" style={{ color: "#006F3E" }}>
							<Img
								src="/android-chrome-512x512.png"
								width="40px"
								height="40px"
								imgClass="mr-2" />
							Black Pay
						</Link>
					</div>
					{/* <!-- Nav --> */}
					<div className="sonarNav wow fadeInUp" data-wow-delay="1s">
						<nav>
							<ul>
								<li className='nav-item active'>
									<Link to='/'
										style={{ color: location.pathname == "/" ? "#006F3E" : "white" }}
										className='nav-link'
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color: location.pathname == "/" ? "#006F3E" : "white"
											}}>
											<svg className="bi bi-house" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
												<path fillRule="evenodd"
													d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
											</svg>
										</span>
										Home
									</Link>
								</li>
								<li className='nav-item active'>
									{props.auth.email == "alphaxardgacuuru47@gmail.com" &&
										<Link to='/parking-scanner'
											style={{ color: location.pathname == "/parking-scanner" ? "#006F3E" : "white" }}
											className='nav-link'
											onClick={() => setMenu("")}>
											<span
												style={{
													float: "left",
													paddingRight: "20px",
													color: location.pathname == "/parking-scanner" ? "#006F3E" : "white"
												}}>
												<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-qr-code-scan" viewBox="0 0 16 16">
													<path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z" />
													<path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z" />
													<path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z" />
													<path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z" />
													<path d="M12 9h2V8h-2v1Z" />
												</svg>
											</span>
											Parking Scanner
										</Link>}
								</li>
								<li className='nav-item active'>
									<Link to='/history'
										style={{ color: location.pathname == "/history" ? "#006F3E" : "white" }}
										className='nav-link'
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color: location.pathname == "/history" ? "#006F3E" : "white"
											}}>
											<svg className="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
											</svg>
										</span>
										History
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<br />
				</div>
				{/* <!-- ***** Main Menu Area End ***** --> */}

				{/* <!-- ***** Header Area Start ***** --> */}
				<header style={{ backgroundColor: "#232323" }} className="header-area">
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12" style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									{/* <!-- Logo Area  --> */}
									<div className="logo-area">
										<Link to="/" style={{ color: "#006F3E" }}>
											<Img
												src="/android-chrome-512x512.png"
												width="40px"
												height="40px"
												imgClass="mr-2" />
											Black Pay
										</Link>
									</div>
									<div className="menu-content-area d-flex align-items-center">
										{/* <!-- Header Social Area --> */}
										<div className="header-social-area d-flex align-items-center">
											{props.auth.email == "guest@gmail.com" ||
												!props.auth.email ?
												<Link className="display-4"
													to="#"
													onClick={() => props.setLogin(true)}>
													Login
												</Link> :
												<TopnavLinks
													{...props}
													bottomMenu={bottomMenu}
													setBottomMenu={setBottomMenu}
													avatarVisibility={avatarVisibility}
													setAvatarVisibility={setAvatarVisibility}
													notificationVisibility={notificationVisibility}
													setNotificationVisibility={setNotificationVisibility}
													notifications={notifications}
													setNotifications={setNotifications}
													logout={logout}
													onNotification={onNotification}
													onDeleteNotifications={onDeleteNotifications} />}
										</div>
										{/* <!-- Menu Icon --> */}
										<a href="#"
											className="hidden"
											id="menuIcon"
											onClick={(e) => {
												e.preventDefault()
												setMenu("menu-open")
											}}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="25"
												height="25"
												fill="#fff"
												className="bi bi-list"
												viewBox="0 0 16 16">
												<path fillRule="evenodd"
													d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
											</svg>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<br />
				<br />
				{/* Remove for profile page for better background image */}
				<span>
					<br />
					<br className="hidden" />
				</span>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						<div className="dropdown-header text-white">
							<h5 style={{ margin: "0px", display: notificationVisibility }}>Notifications</h5>
						</div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "1em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Notifications Bottom */}
					<div className="m-0 p-0" style={{ display: notificationVisibility }}>
						<div style={{ maxHeight: "500px", overflowY: "scroll" }}>
							{/* Get Notifications */}
							{notifications
								.map((notification, key) => (
									<Link
										key={key}
										to={notification.url}
										className="p-2"
										style={{ display: "block", textAlign: "left" }}
										onClick={() => {
											setBottomMenu("")
											// onDeleteNotifications(notification.id)
										}}>
										<small>{notification.message}</small>
									</Link>
								))}
						</div>
						{notifications.length > 0 &&
							<div
								className="dropdown-header"
								style={{ cursor: "pointer" }}
								onClick={() => {
									setBottomMenu("")
									onDeleteNotifications(0)
								}}>
								Clear notifications
							</div>}
					</div>
					{/* Notifications Bottom End */}

					{/* Avatar Bottom */}
					<div className="m-0 p-0" style={{ display: avatarVisibility }}>
						<Link
							to="#"
							style={{ padding: "0px", margin: "0px", textAlign: "left" }}
							className="border-bottom"
							onClick={() => setBottomMenu("")}>
							<h5>
								<span className="ml-3 mr-3">
									<Img
										src={props.auth.profile_picture}
										imgClass="rounded-circle"
										width="25px"
										height="25px"
										alt="Avatar" />
								</span>
								{props.auth.name} <small>{props.auth.username}</small>
							</h5>
						</Link>
						<Link
							to="/download-app"
							className="p-3"
							style={{ display: props.downloadLink ? "inline" : "none", textAlign: "left" }}
							onClick={() => setBottomMenu("")}>
							<h6><span className="ml-3 mr-4"><DownloadSVG /></span>Get App</h6>
						</Link>
						<Link
							to="/privacy-policy"
							className="p-3"
							style={{ textAlign: "left" }}
							title="Privacy Policy">
							<h6><span className="ml-3 mr-4"><PrivacySVG /></span>Privacy Policy</h6>
						</Link>
						<Link
							to="#"
							className="p-3"
							style={{ textAlign: "left" }}
							onClick={(e) => {
								setBottomMenu("")
								logout(e)
							}}>
							<h6><span className="ml-3 mr-4"><LogoutSVG /></span>Logout</h6>
						</Link>
					</div>
					{/* Avatar Bottom End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</>
	)
}

export default TopNav