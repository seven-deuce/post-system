import React, { useState } from "react"
import {  Redirect } from "react-router-dom"
import gql from "graphql-tag";
import { Query } from 'react-apollo';
import styledComponents from "../../styled-components/styledComponents"
import SearchBar from "./sub/search"
import EachPost from "./sub/eachpost"
import FullPost from "./sub/fullpost"
import BackButton from "./sub/backbutton"
const { Content } = styledComponents

const Posts = ( props ) => {

	const [ searchItem, setSearchItem ] = useState( null )
	const [ fullView, setFullView ] = useState( null )
	const [ showBack, setShowBack] = useState( false )

	const reqBody = gql `query {
		getPosts(postId: "all") {
			title
			description
			_id
			comments {
				description
				createdAt
				creatorName
			}
			createdAt
			creator {
				firstName
				lastName
			}
			error

		}
	}`
	const search = ( string ) => {
		setSearchItem( string )
	}

	return (
		<Content>
		<SearchBar search={search} />
		<Query query={reqBody} fetchPolicy="network-only">
		{({ loading, error, data }) => {
			if (loading) return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
				if(error)  {  return <Redirect to="/auth" />}
					if(data) {
						if(fullView) {return ( <FullPost post={fullView} fullView={setFullView} backAction={setFullView}/>)  }
							return (							
								data.getPosts.map((item, i) => {
									if(!searchItem) {
										setShowBack(false)
										return ( 	<EachPost post={item} key={item._id}  fullView={setFullView}/> )
									}
									else if (searchItem) { 
										const patt = new RegExp(searchItem, "gi")
										if( patt.test(item.title) || patt.test(item.description) ) {
											return ( 	
												<div key={item._id}>
												<EachPost post={item} key={item._id}/> 
												</div>
												)	
										}
										else { setShowBack(true)}
									} 
							} 
							)
								) 
					}
				}
			}
			</Query>
			{showBack ? <BackButton backAction={setSearchItem} /> : null}
			</Content>
			)
}

export default Posts

