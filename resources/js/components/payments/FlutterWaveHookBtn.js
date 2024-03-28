import React, { useState } from "react"

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"

import Btn from "@/components/Btn"

const FlutterWaveHookBtn = () => {
	const [loading, setLoading] = useState()

	const config = {
		public_key: process.env.MIX_FW_PUBLIC_KEY_SANDBOX,
		tx_ref: Date.now(),
		payment_options: "card, mpesa, mobilemoney, ussd",
		currency: "KES",
		amount: "100",
		card_number: "5531886652142950",
		cvv: "564",
		expiry_month: "09",
		expiry_year: "32",
		tx_ref: "MC-3243e",
		customer: {
			name: "Alphaxard Gacuuru",
			email: "alphaxardgacuuru47@gmail.com",
			phone_number: "0700364446",
		},
		customizations: {
			title: "Fee Payment",
			description: "Payment of Fees",
			logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
		},
	}

	const handleFlutterPayment = useFlutterwave(config)

	return (
		<div>
			<Btn
				text="charge card"
				onClick={() => {
					setLoading(true)
					handleFlutterPayment({
						callback: (res) => {
							setLoading(false)
							console.log(res)
							// Close the modal programmatically
							closePaymentModal()
						},
						onClose: () => {
							setLoading(false)
						},
					})
				}}
				loading={loading}
			/>
		</div>
	)
}

export default FlutterWaveHookBtn
