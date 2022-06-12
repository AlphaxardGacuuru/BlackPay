import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import HomeSVG from '../svgs/HomeSVG';
import PersonSVG from '../svgs/PersonSVG';

const Bottomnav = (props) => {

	const location = useLocation()

	var display
	var checkLocation = true

	// Hide BottomNav from various pages
	location.pathname.match("/privacy-policy") ||
		location.pathname.match("/download-app") ||
		location.pathname.match("/referral") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register") ?
		display = "none" : display = ""

	return (
		<>
			<br className="anti-hidden" />
			<br className="anti-hidden" />
			<div className="bottomNav menu-content-area header-social-area">
				{/* Bottom Nav */}
				<div className="anti-hidden" style={{ display: display }}>
					<div className="container-fluid menu-area d-flex justify-content-between">
						{/* Home */}
						<Link
							to="/"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100"
							}}>
							<span
								style={{
									fontSize: "20px",
									margin: "0",
									color: location.pathname == "/" ? "#006F3E" : "white"
								}}
								className="nav-link">
								<HomeSVG />
							</span>
						</Link>
						{/* Home End */}
						{/* History */}
						<Link
							to="/history"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100"
							}}>
							<span
								style={{
									fontSize: "23px",
									color: location.pathname == "/history" ? "#006F3E" : "white"
								}}
								className="nav-link">
								<PersonSVG />
							</span>
						</Link>
						{/* History End */}
					</div>
				</div>
				{/* Bottom Nav End */}
			</div>
		</>
	)
}

export default Bottomnav
