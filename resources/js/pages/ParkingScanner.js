import React, { useState } from 'react'
import axios from 'axios'

import Img from '../components/Img'
import Btn from '../components/Btn'

import { QrReader } from 'react-qr-reader'

const ParkingScanner = () => {

	const [token, setToken] = useState()

	// Register Token
	const RegisterToken = () => {
		axios
			.post(props.url)
			.then((res) => props.setMessages([res.data]))
			.catch((err) => props.setErrors(err.data))
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
						videoContainerStyle={{ border: "1px solid #006F3E" }}
						// videoStyle={{ border: "1px solid #006F3E" }}
						className="p-2"
						onResult={(result, error) => {
							if (!!result) {
								setToken(result?.text);

								// Register Token
								RegisterToken()
							}

							if (!!error) {
								console.info(error);
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