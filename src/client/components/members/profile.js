import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthContext"
import gql from "graphql-tag";
import styledComponents from "../../styled-components/styledComponents"
const { Content, H1, H3 } = styledComponents



const Profile = ( props ) => {

	const [ profile, setProfile ] = useState( null )
	const value = useContext( AuthContext )
	useEffect( () => {
		const reqBody = gql `query {
			getUser {
				firstName
				lastName
				email
				createdAt
				createdPosts {
					_id
				}
				createdComments {
					_id
				}
				approved
			}
		}`
		value.client.query( { query: reqBody } )
		.then( res => setProfile( res.data.getUser ) )
		.catch( err => props.history.push( "/auth" ) )

	}, [] )


	if ( profile ) {
		return (
			<Content>
				<H1>Profile</H1>
				<H3>First Name: <b>{profile.firstName}</b></H3>
				<H3>Last Name:  <b>{profile.lastName}</b></H3>
				<H3>Email:  <b>{profile.email}</b> </H3>
				<H3>Join Date: <b>{new Date(Number(profile.createdAt)).toLocaleDateString()}</b></H3>
				<H3>Number of Posts: <b>{profile.createdPosts.length}</b></H3>
				<H3>Number of Comments: <b>{profile.createdComments.length}</b> </H3>
				<H3>Account Status:  <b>{profile.approved ? "active" : "disabled"}</b></H3>

			</Content>
			)
	} else {
		return ( <Content /> )
   }
}


export default Profile