import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import TopnavLinks from "./TopNavLinks"
import Img from "./Img"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import PrivacySVG from "@/svgs/PrivacySVG"
import LogoAlternateSVG from "@/svgs/LogoAlternateSVG"
import HomeSVG from "@/svgs/HomeSVG"
import QRSVG from "@/svgs/QRSVG"
import PersonSVG from "@/svgs/PersonSVG"
import MenuSVG from "@/svgs/MenuSVG"

const TopNav = (props) => {
	axios.defaults.baseURL = props.url

	const [menu, setMenu] = useState("")

	const location = useLocation()

	const [bottomMenu, setBottomMenu] = useState("")
	const [avatarVisibility, setAvatarVisibility] = useState("none")
	const [notificationVisibility, setNotificationVisibility] = useState("none")
	const [notifications, setNotifications] = useState(
		props.getLocalStorage("notifications")
	)

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

		axios.get("/sanctum/csrf-cookie").then(() => {
			axios.post(`${props.url}/api/logout`).then((res) => {
				// Remove phone from localStorage
				localStorage.removeItem("auth")
				props.setMessages(["Logged out"])
				// Update Auth
				props.setAuth({
					name: "Guest",
					email: "guest@gmail.com",
					profile_picture: "/storage/img/male_avatar.png",
					phone: "0700364446",
				})
			})
		})
	}

	const onNotification = () => {
		axios.get("sanctum/csrf-cookie").then(() => {
			axios.put(`${props.url}/api/notifications/update`).then((res) => {
				// Update notifications
				axios
					.get(`${props.url}/api/notifications`)
					.then((res) => setNotifications(res.data))
			})
		})
	}

	const onDeleteNotifications = (id) => {
		axios.delete(`${props.url}/api/notifications/${id}`).then((res) => {
			// Update Notifications
			axios
				.get(`${props.url}/api/notifications`)
				.then((res) => setNotifications(res.data))
		})
	}

	var display

	// Hide TopNav from various pages
	location.pathname.match("/privacy-policy") ||
	location.pathname.match("/download-app") ||
	location.pathname.match("/referral") ||
	location.pathname.match("/login") ||
	location.pathname.match("/register")
		? (display = "none")
		: (display = "")

	return (
		<>
			<div
				id="MyElement"
				style={{ display: display }}
				className={menu}>
				{/* <!-- ***** Main Menu Area Start ***** --> */}
				<div className="mainMenu d-flex align-items-center justify-content-between">
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon"
						onClick={() => setMenu("")}>
						<CloseSVG />
					</div>
					{/* <!-- Logo Area --> */}
					<div className="logo-area">
						<Link to="/">
							<LogoAlternateSVG />
						</Link>
					</div>
					{/* <!-- Nav --> */}
					<div
						className="sonarNav wow fadeInUp"
						data-wow-delay="1s">
						<nav>
							<ul>
								<li className="nav-item active">
									<Link
										to="/"
										style={{
											color: location.pathname == "/" ? "#006F3E" : "white",
										}}
										className="nav-link"
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color: location.pathname == "/" ? "#006F3E" : "white",
											}}>
											<HomeSVG />
										</span>
										Home
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/qr-scanner"
										style={{
											color:
												location.pathname == "/qr-scanner"
													? "#006F3E"
													: "white",
										}}
										className="nav-link"
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color:
													location.pathname == "/qr-scanner"
														? "#006F3E"
														: "white",
											}}>
											<QRSVG />
										</span>
										QR Scanner
									</Link>

									<Link
										to="/parking-scanner"
										style={{
											color:
												location.pathname == "/parking-scanner"
													? "#006F3E"
													: "white",
										}}
										className="nav-link"
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color:
													location.pathname == "/parking-scanner"
														? "#006F3E"
														: "white",
											}}>
											<QRSVG />
										</span>
										Parking Scanner
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/history"
										style={{
											color:
												location.pathname == "/history" ? "#006F3E" : "white",
										}}
										className="nav-link"
										onClick={() => setMenu("")}>
										<span
											style={{
												float: "left",
												paddingRight: "20px",
												color:
													location.pathname == "/history" ? "#006F3E" : "white",
											}}>
											<PersonSVG />
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
				<header
					style={{ backgroundColor: "#232323" }}
					className="header-area">
					<div className="container-fluid p-0">
						<div className="row">
							<div
								className="col-12"
								style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									{/* <!-- Logo Area  --> */}
									<div className="logo-area">
										<Link to="/">
											<LogoAlternateSVG />
										</Link>
									</div>
									<div className="menu-content-area d-flex align-items-center">
										{/* <!-- Header Social Area --> */}
										<div className="header-social-area d-flex align-items-center">
											{props.auth.email == "guest@gmail.com" ||
											!props.auth.email ? (
												<Link
													className="display-4"
													to="#"
													onClick={() => props.setLogin(true)}>
													Login
												</Link>
											) : (
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
													onDeleteNotifications={onDeleteNotifications}
												/>
											)}
										</div>
										{/* <!-- Menu Icon --> */}
										<a
											href="#"
											className="hidden"
											id="menuIcon"
											onClick={(e) => {
												e.preventDefault()
												setMenu("menu-open")
											}}>
											<MenuSVG />
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
					<div
						className="d-flex align-items-center justify-content-between"
						style={{ height: "3em" }}>
						<div></div>
						<div className="dropdown-header text-white">
							<h5
								style={{
									margin: "0px",
									display: notificationVisibility,
								}}>
								Notifications
							</h5>
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
					<div
						className="m-0 p-0"
						style={{ display: notificationVisibility }}>
						<div style={{ maxHeight: "500px", overflowY: "scroll" }}>
							{/* Get Notifications */}
							{notifications.map((notification, key) => (
								<Link
									key={key}
									to={notification.url}
									className="p-2"
									style={{
										display: "block",
										textAlign: "left",
									}}
									onClick={() => {
										setBottomMenu("")
										// onDeleteNotifications(notification.id)
									}}>
									<small>{notification.message}</small>
								</Link>
							))}
						</div>
						{notifications.length > 0 && (
							<div
								className="dropdown-header"
								style={{ cursor: "pointer" }}
								onClick={() => {
									setBottomMenu("")
									onDeleteNotifications(0)
								}}>
								Clear notifications
							</div>
						)}
					</div>
					{/* Notifications Bottom End */}

					{/* Avatar Bottom */}
					<div
						className="m-0 p-0"
						style={{ display: avatarVisibility }}>
						<Link
							to="#"
							style={{
								padding: "0px",
								margin: "0px",
								textAlign: "left",
							}}
							className="border-bottom"
							onClick={() => setBottomMenu("")}>
							<h5>
								<span className="ml-3 mr-3">
									<Img
										src={props.auth.profile_picture}
										imgClass="rounded-circle"
										width="25px"
										height="25px"
										alt="Avatar"
									/>
								</span>
								{props.auth.name} <small>{props.auth.username}</small>
							</h5>
						</Link>
						<Link
							to="/download-app"
							className="p-3"
							style={{
								display: props.downloadLink ? "inline" : "none",
								textAlign: "left",
							}}
							onClick={() => setBottomMenu("")}>
							<h6>
								<span className="ml-3 mr-4">
									<DownloadSVG />
								</span>
								Get App
							</h6>
						</Link>
						<Link
							to="/privacy-policy"
							className="p-3"
							style={{ textAlign: "left" }}
							title="Privacy Policy">
							<h6>
								<span className="ml-3 mr-4">
									<PrivacySVG />
								</span>
								Privacy Policy
							</h6>
						</Link>
						<Link
							to="#"
							className="p-3"
							style={{ textAlign: "left" }}
							onClick={(e) => {
								setBottomMenu("")
								logout(e)
							}}>
							<h6>
								<span className="ml-3 mr-4">
									<LogoutSVG />
								</span>
								Logout
							</h6>
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
