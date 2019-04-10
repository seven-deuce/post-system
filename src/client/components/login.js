import React, { useState, useEffect, createRef, useContext } from "react"
import AuthContext from "../context/AuthContext"
import gql from "graphql-tag";
import { ApolloConsumer } from 'react-apollo';
import functions from "../functions/functions"
import styledComponents from "../styled-components/styledComponents"
const { Content, LoginForm, LoginInput, LoginButton, AuthNotice, H1, P, A } = styledComponents
const { writeToken } = functions

const Login = ( props ) => {


   const value = useContext( AuthContext )
   const [ authNotice, setAuthNotice ] = useState( null )
   const email = createRef(),
      password = createRef()

   useEffect( () => {
      try {
         if ( props.location.state.authNotice ) { setAuthNotice( props.location.state.authNotice ) }
      } catch ( err ) { return }
   } )

   let reqBody = gql `query Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			userId
			email
			exp
			token
			error
		}

	}`

   return (
      <ApolloConsumer errorPolicy="all" >
		{ client => {
			return (  
				<Content>
				<LoginForm onSubmit={ (event) => {
					event.preventDefault()
					client.query({
						query: reqBody,
						variables: {email: email.current.value, password: password.current.value}	,
						watchQuery: {
							errorPolicy: 'all',
						},	
					}).then(res=> {
						if(res.data.login.error) {
							setAuthNotice(res.data.login.error)
						}
						else {
							const tok = res.data.login.token
							writeToken(tok)
							value.login(res.data.login)
							props.history.push( "/members/posts")
						}
					})
					.catch(err=> console.log(err))

				}}>
				<H1>Login to Member Area</H1>

				{authNotice ? (<AuthNotice>{authNotice}</AuthNotice>) : null }				
				<LoginInput type="email" required maxlength="30" name="email" placeholder="Email..." ref={email}/>
				<LoginInput type="password" required maxlength="30" name="password" placeholder="Password..." ref={password} />

				<LoginButton type="submit"  >Sign in</LoginButton>	

				<P>Don’t have an account yet? <A href="/signup">Click here!</A></P>
				</LoginForm>


				</Content>
				)} }
			</ApolloConsumer>

   )
}

export default Login