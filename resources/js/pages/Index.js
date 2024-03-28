import React, { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import Axios from "axios"

import Img from "@/components/Img"
import Btn from "@/components/Btn"

import ForwardSVG from "@/svgs/ForwardSVG"
import FlutterWaveHookBtn from "../components/payments/FlutterWaveHookBtn"

const Index = (props) => {
	const [loading, setLoading] = useState()

	const FW_PUBLIC_KEY = process.env.MIX_FW_PUBLIC_KEY_SANDBOX
	const FW_SECRET_KEY = process.env.MIX_FW_SECRET_KEY_SANDBOX

	const headers = {
		Authorization: `Bearer ${FW_SECRET_KEY}`,
		"Content-Type": "application/json",
	}

	const sandboxDetails = {
		card_number: "5531886652142950",
		cvv: "564",
		expiry_month: "09",
		expiry_year: "32",
		currency: "NGN",
		amount: "100",
		fullname: "Yolande Aglaé Colbert",
		email: "user@example.com",
		tx_ref: "MC-3243e",
		redirect_url: "https://www,flutterwave.ng",
	}

	const cardDetails = {
		card_number: "4890010101294779",
		cvv: "537",
		expiry_month: "07",
		expiry_year: "24",
		currency: "KES",
		amount: "10",
		fullname: "Alphaxard Njoroge Gacuuru",
		email: "alphaxardgacuuru47@gmail.com",
		tx_ref: "MC-3243e",
		redirect_url: "http://localhost:3002",
	}

	const mpesaDetails = {
		tx_ref: "MC-15852113s09v5050e8",
		amount: "10",
		currency: "KES",
		email: "user@example.com",
		phone_number: "25454709929220",
		fullname: "Yolande Aglaé Colbert",
	}

	const onChargeCard = () => {
		setLoading(true)

		Axios.get(
			"https://api.flutterwave.com/v3/charges?type=mpesa",
			{ mpesaDetails },
			// { details },
			{ headers }
		)
			.then((res) => {
				setLoading(false)
				console.log(res)
			})
			.catch((err) => {
				setLoading(false)
				console.log(err)
			})
	}

	const onChargeCard2 = () => {
		setLoading(true)

		fetch("https://api.flutterwave.com/v3/charges?type=mpesa", {
			method: "POST",
			headers: headers,
			body: JSON.stringify(mpesaDetails),
		})
			.then((data) => {
				setLoading(false)
				console.log(data)
			})
			.catch((error) => {
				setLoading(false)
				console.error("Error:", error)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-10">
				<div className="col-sm-4 shadow rounded my-5 mx-auto px-5 p-5">
					<Img
						src="/storage/img/default-alternate.png"
						style={{ width: "100%", height: "auto" }}
					/>
				</div>

				{/* <Btn
					text="charge card"
					onClick={onChargeCard2}
					loading={loading}
				/> */}

				{/* <FlutterWaveBtn /> */}

				<div className="d-flex justify-content-center my-5">
					<FlutterWaveHookBtn />
				</div>

				<p className="my-5">
					Welcome to Black Pay - your one-stop solution for secure and seamless
					online payments. With Black Pay, businesses of all sizes can
					effortlessly accept payments from customers around the globe. Our
					intuitive platform offers a range of payment options, including
					credit/debit cards, digital wallets, and bank transfers, ensuring
					convenience for both merchants and customers. Backed by
					state-of-the-art security features, Black Pay guarantees the highest
					level of protection for every transaction, giving you peace of mind
					and confidence in every payment. Whether you're a small startup or a
					large enterprise, Black Pay empowers you to grow your business and
					drive revenue with ease. Join thousands of satisfied merchants who
					trust Black Pay for their payment processing needs and experience the
					difference today!
				</p>

				<div className="d-flex justify-content-start my-5">
					<div>
						<Link to="/qr-scanner">
							<h5>Go to Parking Scanner</h5>
						</Link>
					</div>
					<div className="text-white ml-2">
						<Link to="/qr-scanner">
							<ForwardSVG />
						</Link>
					</div>
				</div>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default Index
