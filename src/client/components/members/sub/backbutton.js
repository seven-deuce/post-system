import React from "react"
import back from "../../../img/back.png"
import styledComponents from "../../../styled-components/styledComponents"
const { A } = styledComponents

const BackButton = ( props ) => {
	const divStyle = { margin: "10px", display: "flex", alignItems: "center", cursor: "pointer" }
	return (
		<div onClick={()=> props.backAction(null )} style={divStyle}>
		<img src={back} alt="Go Back" />
		<A src="#"  > Go Back </A>
		</div>
		)
}

export default BackButton