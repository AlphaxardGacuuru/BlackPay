import React, { useState, useEffect } from 'react'
import axios from 'axios'

const History = (props) => {

	const [history, setHistory] = useState([])

	useEffect(() => {
		axios.get("api/paid-tokens")
			.then((res) => setHistory(res.data))
			.catch(() => props.setErrors["Failed to fetch History"])
	}, [])

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<table className="table table-responsive">
					<thead className="border border-0">
						<tr className="border border-0">
							<th  className="border-top border-dark">Token</th>
							<th  className="border-top border-dark">Amount</th>
							<th  className="border-top border-dark">In</th>
							<th  className="border-top border-dark">Out</th>
						</tr>
					</thead>
					<tbody>
						{history.map((payment, key) => (
							<tr key={key}>
								<td className="border-bottom border-dark">{payment.token}</td>
								<td className="border-bottom border-dark">{payment.amount}</td>
								<td className="border-bottom border-dark">{payment.in}</td>
								<td className="border-bottom border-dark">{payment.created_at}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default History