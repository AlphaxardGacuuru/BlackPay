import React, { useState } from 'react'

import Img from '../components/Img'
import Btn from '../components/Btn'

import { QrReader } from 'react-qr-reader'

const Index = () => {

	const [data, setData] = useState()

	// navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	// .then((res) => console.log(res))
	// .catch((err) => console.log(err))

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<center>
					<h3>Scan QR Code</h3>
					<QrReader
						constraints={{ facingMode: 'environment' }}
						delay={300}
						// containerStyle={{ border: "1px solid #006F3E" }}
						videoContainerStyle={{ border: "1px solid #006F3E" }}
						// videoStyle={{ border: "1px solid #006F3E" }}
						className="p-2"
						onResult={(result, error) => {
							if (!!result) {
								setData(result?.text);
							}

							if (!!error) {
								console.info(error);
							}
						}}
						legacyMode />

					<br />
					<h6>Scanned code</h6>
					<p>{data}</p>
				</center>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Index