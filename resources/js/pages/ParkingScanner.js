import React, { useState } from 'react'
import axios from 'axios'

import { QrReader } from 'react-qr-reader'

const ParkingScanner = (props) => {

	const [token, setToken] = useState()

	// Register Token
	const RegisterToken = (token) => {
		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`/api/tokens`, {
				token: token
			}).then((res) => {
				console.log(res.data)
				props.setMessages([res.data])
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				props.setErrors(newError)
			})
		});
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<center>
					<h3>Parking Scanner</h3>

					<QrReader
						constraints={{ facingMode: 'environment' }}
						delay={300}
						// containerStyle={{ border: "1px solid #006F3E" }}
						// videoContainerStyle={{ border: "1px solid #006F3E" }}
						// videoStyle={{ border: "1px solid #006F3E" }}
						className="p-2"
						onResult={(result, error) => {
							if (!!result) {
								setToken(result?.text);
								// Register Token
								RegisterToken(result?.text)
							}

							if (!!error) {
								// console.info(error);
							}
						}}
						legacyMode />

					<br />
					<h6>Scanned code</h6>
					<p>{token}</p>
				</center>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default ParkingScanner