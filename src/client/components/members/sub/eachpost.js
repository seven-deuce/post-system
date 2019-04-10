import React from "react"
import commentIcon from "../../../img/comment.png"
import fn from "../../../functions/functions"
import styledComponents from "../../../styled-components/styledComponents"
const { List, ListTitle, ListTitleDiv, Description, A, H3, AA } = styledComponents

const { sliceText } = fn //helper functions

const imgStyleComment = { width: "23px", height: "20px", paddingBottom: "15px" }

const EachPost = ( props ) => {
	const { title, description: desc, createdAt, comments } = props.post
	const totalComents = comments.length
	const creator = props.post.creator.firstName + " " + props.post.creator.lastName
	const { shortTitle, shortDesc } = sliceText( title, desc )
	const data = { __html: shortDesc };

	return (
		<List>
			<ListTitle>
				<H3><AA href="#" onClick={()=> props.fullView(props.post)} >{shortTitle}</AA></H3>
				<ListTitleDiv	>
				<p >By: {creator} on {new Date(Number(createdAt)).toLocaleDateString()}</p>
				<h2 style={{margin: "2px", padding: "`15px"}}>{totalComents}<img src={commentIcon} style={imgStyleComment} alt="comments"/>  </h2>

				</ListTitleDiv>				

			</ListTitle>
			<Description>
				<p dangerouslySetInnerHTML={data} /><A href="#" onClick={()=> props.fullView(props.post)}> click here to read full post</A>
			</Description>
		</List>
		)
}

export default EachPost