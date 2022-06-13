import React from 'react'

const Btn = ({ btnStyle, btnClass, btnText, onClick, loading }) => {
	return (
		<Btn
			style={btnStyle}
			className={btnClass}
			onClick={onClick}>
			{btnText}
			{loading &&
				<div className="spinner-border ml-2 my-auto"
					style={{
						borderTopWidth: "2px",
						borderBottomWidth: "2px",
						borderLeftWidth: "2px",
						width: "15px",
						height: "15px",
						color: "inherit"
					}}>
				</div>}
		</Btn>
	)
}

Btn.defaultProps = {
	btnClass: 'sonar-btn',
	loading: false
}

export default Btn