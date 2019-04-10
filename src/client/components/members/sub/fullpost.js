import React, { Fragment, useState, useContext, createRef } from "react"
import AuthContext from "../../../context/AuthContext"
import gql from "graphql-tag";
import commentIcon from "../../../img/comment.png"
import BackButton from "./backbutton"
import fn from "../../../functions/functions"
import styledComponents from "../../../styled-components/styledComponents"
const { List, ListTitle, ListTitleDiv, Description, H3, AA, PostCommentArea, Textarea, LoginButton, ListComment, CommentsWrapper } = styledComponents

const imgStyleComment = { width: "23px", height: "20px", paddingBottom: "15px" }
const { purify } = fn

const Comments =  (props) => {

	const comment = props.post
	const { description: desc, createdAt, creatorName  } = comment
	const data = { __html: desc }

	return (

		<ListComment>
			<ListTitle style={{backgroundColor: "#66a3ff"}}>
				<H3 style={{paddingTop: "0"}}>{creatorName} replied on {new Date(Number(createdAt)).toLocaleDateString()}</H3>
				<ListTitleDiv	>

				</ListTitleDiv>				

			</ListTitle>
			<Description style={{borderColor: "#66a3ff"}} >
				<p dangerouslySetInnerHTML={data} />
			</Description>
		</ListComment>
		)
}

const PostComment = (props) => {
	const [ postDoneMsg, setPostDoneMsg ] = useState( false )
	const value = useContext( AuthContext )
	const description = createRef()
	
	const postComment = (event) => {
		event.preventDefault()
		const mutBody = gql`mutation PostComment($description: String!, $userId: String!,  $postId: String! ){
			postComment(description: $description, userId:$userId, postId: $postId){
				_id
			}
		}`
		const variables = {description: purify(description.current.value), userId: value.auth.userId, postId: props.postId} 
		value.client.mutate({
			mutation: mutBody, 
			variables: variables
		})
		.then(res => setPostDoneMsg(true)).catch(err=> console.log(err))
	}

	return (

		<PostCommentArea onSubmit={postComment} >
		<Textarea rows="8" placeholder="Post your comment here..." ref={description} />		
		<LoginButton type="submit">Post Reply</LoginButton>
		{postDoneMsg ? <H3 style={{textAlign: "center"}}>Your comment is submitted successfully!</H3> : null}
		</PostCommentArea>

		)
}

const FullPost = ( props ) => {
	const { title, description: desc, createdAt, comments, _id } = props.post
	const totalComents = comments.length
	const creator = props.post.creator.firstName + " " + props.post.creator.lastName
	const data = { __html: desc };

	return (
		<Fragment>
			<List>
				<ListTitle>
					<H3 ><AA href="#">{title}</AA></H3>
				<ListTitleDiv	>
					<p >By: {creator} on {new Date(Number(createdAt)).toLocaleDateString()}</p>
					<h2 style={{margin: "2px", padding: "`15px"}}>{totalComents}<img src={commentIcon} style={imgStyleComment} alt="comments"/>  </h2>

				</ListTitleDiv>				

				</ListTitle>
				<Description>
					<p dangerouslySetInnerHTML={data} />
				</Description>
			</List>

			<PostComment postId={_id} />

			<CommentsWrapper style={{display: "flex", flexDirection: "column"}}  >
				{comments.map((item, i)=>{
					return (
						<Comments post={item} key={i}/>
						)
				})}
			
			</CommentsWrapper>
			<BackButton {...props} />
		</Fragment>
		)
}

export default FullPost