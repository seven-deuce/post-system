import React, { createRef, useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styledComponents from "../styled-components/styledComponents"
import functions from "../functions/functions"
const { Content, LoginForm, LoginInput, LoginButton, AuthNotice, H1 } = styledComponents
const { writeToken } = functions

const Signup = (props) => {

	const value = useContext(AuthContext)

	const [ authNotice, setAuthNotice ] = useState( false )
	const firstName = createRef(),
	lastName = createRef(),
	email = createRef(),
	password = createRef()
	let reqBody = gql `mutation CreateUser($firstName: String!, $lastName: String! , $email: String!, $password: String!){
		createUser(userInput: {firstName: $firstName, lastName: $lastName ,email: $email, password: $password}) {
			token
			error
		}
	}`
	return (
		<Mutation mutation={reqBody}>

		{(createUser, response) =>{

			return (
				<Content>
				<LoginForm  onSubmit={  (event) =>{
					event.preventDefault()
					createUser({ variables: { firstName: firstName.current.value, 
						lastName:lastName.current.value, 
						email:email.current.value, 
						password: password.current.value } 
					})
					.then(result => {

						if(result.data.createUser.error) {
							setAuthNotice(result.data.createUser.error)
							return result
						}	
						else {
							const tok = result.data.createUser.token
							writeToken(tok)
							value.login(result.data.createUser)
							props.history.push( "/members/posts")

						}
					}).catch(err=> console.log(err)) 
				}}>

				<H1>Sign up Now and Join Our Community!</H1>

				{(authNotice) ? (<AuthNotice>{authNotice}</AuthNotice>) : null }
				<LoginInput type="text" required maxlength="30" name="firstname" placeholder="First Name..." ref={firstName} />
				<LoginInput type="text" required maxlength="30" name="lastname" placeholder="Last Name..." ref={lastName}/>
				<LoginInput type="email" required maxlength="30" name="email" placeholder="Email..." ref={email} />
				<LoginInput type="password" required maxlength="30" name="password" placeholder="Password..." ref={password} />

				<LoginButton type="submit">Sign up</LoginButton>	
				</LoginForm>
				</Content>

				) } }




			</Mutation>
			)
}




export default Signup