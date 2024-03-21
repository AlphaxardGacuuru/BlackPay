import React from "react"

import Img from "@/components/Img"

import ForwardSVG from "@/svgs/ForwardSVG"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Index = () => {
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
