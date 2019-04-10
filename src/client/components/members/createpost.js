import React, { createRef, useState, useEffect , useContext } from "react"
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import AuthContext from "../../context/AuthContext"
import styledComponents from "../../styled-components/styledComponents"
import fn from "../../functions/functions"
const { Content, H1, Textarea, LoginButton, CreatPostForm, LoginInput } = styledComponents

const { purify } = fn

const CreatePostDisplay = () => {

	const [ postDoneMsg, setPostDoneMsg ] = useState( false )
	const postDone = ( data ) => {
		setPostDoneMsg( true )
	}
	const description = createRef()
	const title = createRef()
	let reqBody = gql `mutation CreatePost($title: String!, $description: String! ){
		createPost(postInput: {title: $title, description: $description}) {
			title
			description
		}
	}`

	if ( postDoneMsg ) { return <H1>Your post has been published successfully!</H1> }

		return (
			<Mutation mutation={reqBody} onCompleted={postDone}>

			{(createPost, response) => {

				return(		

					<CreatPostForm onSubmit={  (event) => {
						event.preventDefault()
						createPost({ variables: { title: title.current.value, 
							description: purify(description.current.value)
						}
					})
						.then(result => {
							return result
						}).catch(err=> console.log(err)) 
					}} >

					<h1>Create a new post:</h1>
					<LoginInput type="text" required maxlength="170" name="title" placeholder="Title" ref={title} />
					<Textarea rows="8" placeholder="Post your comment here..." ref={description} />		
					<LoginButton type="submit">Post</LoginButton>

					</CreatPostForm>
					)
			}
		}
		</Mutation>
		)
}


const CreatePost = (props) => {
	const value = useContext( AuthContext )
	const [auth, setAuth] = useState(false)

	useEffect( () => {
		value.client.query( { query: gql`query { checkAuth }` } )
		.then( res => (!res.data.checkAuth) ? props.history.push( "/auth" ) : setAuth(true) )
		.catch( err => props.history.push( "/auth" ) )
	} )

	return (
		<Content>
				{auth ? <CreatePostDisplay /> : null}
		</Content>
		)

}


export default CreatePost