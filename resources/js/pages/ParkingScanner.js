import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Btn from '../components/Btn'
import Img from '../components/Img'
import QRCodeScan from '../svgs/QRCodeScan'

import { QrReader } from 'react-qr-reader'

const ParkingScanner = (props) => {

	const [token, setToken] = useState()

	useEffect(() => {
		// Register Token
		if (token) {
			axios.get('/sanctum/csrf-cookie').then(() => {
				axios.post(`/api/tokens`, {
					token: token,
					type: "in"
				}).then((res) => {
					props.setMessages([res.data])
					// Scroll downwards
					window.scrollBy({
						top: 100,
						right: 0,
						behavior: "smooth"
					})
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
	}, [token])

	// Check compatibility
	if (!('BarcodeDetector' in window)) {
		console.log('Barcode Detector is not supported by this browser.');
	} else {
		console.log('Barcode Detector supported!');

		// Create new detector
		const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });

		// Check supported types
		barcodeDetector.getSupportedFormats()
			.then((supportedFormats) => {
				supportedFormats.forEach((format) => console.log(format));
			});
	}

	const video = useRef(null)
	const constraints = { video: true };

	navigator.mediaDevices.getUserMedia(constraints)
		.then((stream) => {
			/* Use the stream */
			video.current.srcObject = stream;
			video.current.onloadedmetadata = (e) => {
				video.current.play();
			};
		})
		.catch((err) => {
			/* Handle the error */
		});

	return (
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<center>
					{/* <h3>Parking Scanner</h3> */}

					{/* <QrReader
						constraints={{ facingMode: 'environment' }}
						delay={300}
						// containerStyle={{ border: "1px solid #006F3E" }}
						// videoContainerStyle={{ border: "1px solid #006F3E" }}
						// videoStyle={{ border: "1px solid #006F3E" }}
						className="p-2"
						onResult={(result, error) => {
							if (!!result) {
								setToken(result?.text);
							}

							if (!!error) {
								// console.info(error);
							}
						}}
						legacyMode />
					<br /> */}

					{/* Code Box */}
					{/* <div className="d-flex justify-content-between text-center">
						<div className="bg-dark text-light m-2 p-2 flex-fill"
							style={{ borderRadius: "20px" }}>
							<span className="display-4">{token}</span>
							<h6>Code</h6>
						</div>
					</div> */}
					<div
						style={{
							width: window.innerWidth,
							height: window.innerHeight,
							overflow: "hidden"
						}}>
						<video ref={video}></video>
						<div
							className="video-overlay"
							style={{ fontSize: "10em", color: "#006F3E" }}>
							<QRCodeScan />
						</div>
					</div>
				</center>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default ParkingScanner