import React, { useState } from 'react'
import axios from 'axios';

import Btn from '../components/Btn'

const Pay = (props) => {

	axios.defaults.baseURL = props.url

	const [bottomMenu, setBottomMenu] = useState()

	// Send STKPush
	const STKPush = (amount) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.put(`${props.url}/api/kopokopo/${amount}`)
				.then((res) => props.setMessages([res.data]))
				.catch((err) => {
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					newError.push(err.response.data.message)
					props.setErrors(newError)
					console.log(err.response)
				})
		})
	}

	const onPay = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			var intervalId = window.setInterval(() => {
				axios.post('api/paid-tokens', {
					token: props.token,
					amount: props.charge
				})
					.then((res) => {
						// Check if payment has been recieved
						if (res.data == "Payment Received") {
							props.setMessages([res.data])
							setBottomMenu()
							clearInterval(intervalId)
						}

						// Stop loop after 30s
						setTimeout(() => {
							clearInterval(intervalId)
							setBottomMenu()
						}, 30000)
					})
					.catch((err) => {
						props.setErrors([err.response.data.message])
					})
			}, 2000);
		})
	}

	return (
		<div>
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4 text-center">
					<h5 className="mt-4">Once you click the button below a pop up will appear on your phone asking you to pay</h5>
					<h4 className="text-success">KES {props.charge}</h4>
					<h5>to</h5>
					<h4 style={{ color: "dodgerblue" }}>Kopokopo</h4>
					<br />

					{/* Checkout button */}
					<Btn
						btnStyle={{ borderRadius: "20px", textTransform: "uppercase", width: "80%" }}
						text="pay with mpesa"
						onClick={(e) => {
							if (props.auth.email == "guest@gmail.com" || !props.auth) {
								props.setLogin(true)
							} else {
								e.preventDefault()
								setBottomMenu("menu-open")
								onPay()
								STKPush(props.charge)
							}
						}
						} />
				</div>
				<div className="col-sm-4"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between mb-3">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Payment</a>
						</div>

						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							onClick={() => {
								setBottomMenu("")
							}}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="currentColor"
								className="bi bi-x"
								viewBox="0 0 16 16">
								<path
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</div>
					</div>

					<center>
						<h5>Request was sent to <span style={{ color: "dodgerblue" }}>{props.auth.phone}</span></h5>
						<br />

						<h6>Checking payment</h6>
						<div id="sonar-load" className="mt-4 mb-4"></div>
					</center>
					<br />
					<br />
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</div>
	)
}

export default Pay