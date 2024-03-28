import React from "react"

const Btn = ({ btnStyle, btnClass, text, onClick, loading }) => {
	return (
		<button
			style={btnStyle}
			className={btnClass}
			onClick={onClick}
			disabled={loading}>
			{text}
			{loading && (
				<div
					className="spinner-border ml-2 my-auto"
					style={{
						borderTopWidth: "2px",
						borderBottomWidth: "2px",
						borderLeftWidth: "2px",
						width: "15px",
						height: "15px",
						color: "inherit",
					}}></div>
			)}
		</button>
	)
}

Btn.defaultProps = {
	btnClass: "btn btn-outline-success",
	btnStyle: {
		borderRadius: "20px",
		minWidth: "100px",
		textTransform: "uppercase",
	},
	loading: false,
}

export default Btn
