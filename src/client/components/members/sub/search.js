import React, { createRef } from "react"
import searchIcon from "../../../img/search.png"
import styledComponents from "../../../styled-components/styledComponents"
const {  SearchInput, SearchArea, EmptyBtn  } = styledComponents



const imgStyleSearch = { width: "32px", height: "32px" }


const SearchBar = ( props ) => {

	const searchString = createRef()

	const searchHandler = ( event ) => {
		event.preventDefault()
		props.search( searchString.current.value )
	}

	return (
		<form onSubmit={searchHandler}>
			<SearchArea>
			
				<SearchInput type="text" name="search" placeholder="Search..." ref={searchString}/>	
				<EmptyBtn type="submit" >
				<img src={searchIcon} style={imgStyleSearch} alt="Search Posts" /> 
				</EmptyBtn>

			</SearchArea>
		</form>
		)
}

export default SearchBar