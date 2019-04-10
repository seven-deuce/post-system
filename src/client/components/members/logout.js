import React, { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext"
import styledComponents from "../../styled-components/styledComponents"
const { H1, Content } = styledComponents



const Logout = ( props ) => {
	const value = useContext( AuthContext )
	useEffect( () =>{
		return value.logout()
	})

	return (
		<Content>
			<H1>You have successfully logged out</H1>
		</Content>

		)

}

export default Logout