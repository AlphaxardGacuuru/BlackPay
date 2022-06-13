import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

import Btn from '../components/Btn'

const Register = (props) => {

	let { name, email, avatar } = useParams();
	
	const [phone, setPhone] = useState('07')

	const history = useHistory()

	// Remove all spaces from avatar
	avatar = avatar.replace(/\s/g, "/")
	
	const onSubmit = () => {
		axios.get('/sanctum/csrf-cookie').then(() => {
			// Register User
			axios.post(`${props.url}/api/register`, {
				name: name,
				email: email,
				avatar: avatar,
				phone: phone,
				// remember_token: 'true'
			}).then((res) => {
				props.setMessages(["Account created"])
				// Update auth data
				axios.get(`${props.url}/api/home`)
					.then((res) => props.setAuth(res.data))
				// Redirect user
				setTimeout(() => history.push('/'), 1000)
			}).catch(err => {
				console.log(err.response)
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				props.setErrors(newError)
			});
		});
	}

	return (
		<div
			className="sonar-call-to-action-area section-padding-0-100"
			style={{ background: "rgba(0, 0, 0, 1)" }}>
			<div className="backEnd-content">
				<h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>Black Pay</h2>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
							<h2 className="mt-2" style={{ color: "#006F3E" }}>Register</h2>

							<div className="card-body contact-form">
								<form method="POST" action="" onSubmit={onSubmit}>
									<div className="form-group row">
										<label htmlFor="phone" className="col-md-4 col-form-label text-md-right">
											<p style={{ color: "#006F3E" }}>Enter your Safaricom number</p>
										</label>

										<div className="col-md-6">
											<input
												id="phone"
												type="text"
												className="form-control"
												style={{ color: "#006F3E", borderColor: "#006F3E" }}
												name="phone"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												required />
										</div>
									</div>

									<div className="form-group row mb-0">
										<div className="col-md-8 offset-md-4">
											<Btn
												type="submit"
												btnClass="sonar-btn gold-btn float-right"
												btnText={'register'} />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
											<br />
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
