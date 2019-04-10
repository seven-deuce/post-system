import React, { useState, useEffect, useContext, createRef } from "react"
import AuthContext from "../../context/AuthContext"
import fn from "../../functions/functions"
import gql from "graphql-tag";
import styledComponents from "../../styled-components/styledComponents"
import commentIcon from "../../img/comment.png"
const { Content, SearchInput, List, ListTitle, ListTitleDiv, Description, H3, PostCommentArea, Textarea, LoginButton, EditBar } = styledComponents

const imgStyleComment = { width: "23px", height: "20px", paddingBottom: "15px" }
const { purify } = fn

const PostSnippet = ( props ) => {

   const { title, description: desc, updatedAt, comments } = props.post
   const totalComents = comments.length
   const data = { __html: desc };
   return (
      <List>
         <ListTitle>
            <H3>{title}</H3>
            <ListTitleDiv	>
               <p >By: <b>You</b> last updated on {new Date(Number(updatedAt)).toLocaleDateString()}</p>
               <h2 style={{margin: "2px", padding: "`15px"}}>{totalComents}<img src={commentIcon} style={imgStyleComment} alt="comments"/>  </h2>
            </ListTitleDiv>		
            <div>
               <EditBar onClick={()=>props.edit(props.post)}>Edit</EditBar>
               <EditBar onClick={()=>props.deletePost(props.post)}>Delete</EditBar>
            </div>	
         </ListTitle>
         <Description>
            <p dangerouslySetInnerHTML={data} />
         </Description>
      </List>
   )
}

const EditPost = ( props ) => {

   const { title, description: desc, _id } = props.post
   const titleEdited = createRef()
   const descEdited = createRef()

   const submitHandler = ( event ) => {
      event.preventDefault()
      props.editedPost( _id, purify(titleEdited.current.value), purify(descEdited.current.value) )
   }

   return (
      <PostCommentArea onSubmit={submitHandler}>
         <br/><br/><br/>
         <SearchInput defaultValue={title} ref={titleEdited}/>
         <Textarea rows="20" defaultValue={desc} ref={descEdited}></Textarea>
         <LoginButton type="submit">Update My Post</LoginButton>
      </PostCommentArea>
   )
}


const MyPosts = (props) => {

   const [ myPosts, setMyposts ] = useState( null )
   const [ edit, setEdit ] = useState( null )
   const [ mutationMsg, setMutationMsg ] = useState( null )
   const value = useContext( AuthContext )

   const queryMyPosts = () => {
      const reqBody = gql `query  {
         getPosts(postId: "myposts") {
           title
           description
           updatedAt
           _id
           comments {
             _id
          }
          creator {
             firstName
             lastName
          }
       }
    }`
      value.client.query( { query: reqBody }, {
            options: {
               errorPolicy: 'all',
               fetchPolicy: "no-cache"
            }
         }, )
         .then( res => setMyposts( res.data.getPosts ) ).catch( err => props.history.push( "/auth" ) )
   }

   useEffect( () => {
      queryMyPosts()
   }, [] )

   const editHandler = ( props ) => {
      setMutationMsg( null )
      setMyposts( null )
      setEdit( props )

   }

   const editedPostHandler = ( id, title, description ) => {
      const mutBody = gql `mutation EditPost($postId: String!,$title: String!, $description: String!) {
            editPost(postId: $postId, title: $title, description: $description) {
                  _id
            }
         }`

      value.client.mutate( {
            mutation: mutBody,
            variables: { postId: id, title: title, description: description }
         } )
         .then( res => {
            setMutationMsg( "Your post is updated successfully!" )
            queryMyPosts()
            setEdit( null )
         } ).catch( err => console.log( err ) )
   }

   const deletePostHandler = ( props ) => {

      const comments = props.comments.map( item => item._id )
      const mutBody = gql `mutation DeletePost($postId: String!,$comments: [String!]!){
      deletePost(postId: $postId, comments: $comments){
              _id
           }
      }`

      value.client.mutate( {
            mutation: mutBody,
            variables: { postId: props._id, comments: comments }
         } )
         .then( res => {
            setMutationMsg( "Your post is removed successfully!" )
            queryMyPosts()
            setEdit( null )
            console.log( res )
         } ).catch( err => console.log( err ) )
   }

   return (
      <Content>
      
         { mutationMsg ?  (<H3>{mutationMsg}</H3>) : null}
         {myPosts ?  myPosts.map( (item, i) => {
            return (<PostSnippet post={item}  key={i} edit={editHandler} deletePost={deletePostHandler}/>)
         })   : null}

         {edit ?  ( <EditPost post={edit} editedPost={editedPostHandler}  />) : null }

      </Content>
      )
}
export default MyPosts