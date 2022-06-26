import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Btn from '../components/Btn'

import { QrReader } from 'react-qr-reader'
import axios from 'axios'

const Index = (props) => {

	const [token, setToken] = useState()
	const [timetaken, setTimetaken] = useState()

	// navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	// .then((res) => console.log(res))
	// .catch((err) => console.log(err))

	const scrollToPayButton = () => {
		setTimeout(() => {
			window.scrollBy({ top: 200, right: 0, behavior: "smooth" })
		}, 1000)
	}

	const getBill = (token) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.get(`api/tokens/${token}`)
				.then((res) => {
					setTimetaken(res.data['timetaken'])
					props.setBill('KES ' + res.data['bill'])
					scrollToPayButton()
				})
				.catch((err) => props.setErrors([err.data]))
		})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div style={{ borderRadius: "30px" }}>
					<center>
						<h3>Scan QR Code</h3>
						<QrReader
							constraints={{ facingMode: 'environment' }}
							delay={100}
							ViewFinder=""
							// containerStyle={{  }}
							// videoContainerStyle={{  }}
							// videoStyle={{  }}
							className="p-3"
							onResult={(result, error) => {
								if (!!result) {
									setToken(result?.text);
									getBill(result?.text)
								}

								if (!!error) {
									// console.info(error);
								}
							}}
							legacyMode />
					</center>
					<br />

					{/* Code Box */}
					<div className="d-flex justify-content-between text-center">
						<div className="bg-dark text-light m-2 p-2 flex-fill"
							style={{ borderRadius: "20px" }}>
							<span className="display-4">{token}</span>
							<h6>Code</h6>
						</div>
					</div>

					{/* Hours and Bill FlexBox */}
					<div className="d-flex justify-content-between text-center">
						<div className="bg-primary text-light m-2 p-2 flex-fill"
							style={{ borderRadius: "20px" }}>
							<span className="display-4">{timetaken}</span>
							<h6>Hours</h6>
						</div>
						<div className="bg-success text-light m-2 p-2 flex-fill"
							style={{ borderRadius: "20px" }}>
							<span className="display-4">{props.bill}</span>
							<h6>Bill</h6>
						</div>
					</div>

					{/* Pay Button */}
					<div className="mt-4 p-2">
						{props.bill &&
							<Link
								to="/pay"
								className="w-100 btn btn-outline-success"
								style={{ borderRadius: "20px", textTransform: "uppercase" }}>
								proceed to payment
							</Link>}
					</div>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Index