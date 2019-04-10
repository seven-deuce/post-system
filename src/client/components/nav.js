import React, { useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { NavLink } from 'react-router-dom';
import styledComponents from "../styled-components/styledComponents"
const { NavArea, NavLinks } = styledComponents


const OpenNav = () => {
   return (
      <NavArea>
      <NavLink to="/" exact activeClassName="menu-selected"><NavLinks>Login</NavLinks></NavLink>

      <NavLink exact to="/signup" activeClassName="menu-selected"><NavLinks>Sign up</NavLinks></NavLink>
      </NavArea>
   )
}

const MemeberNav = () => {
   return (
      <NavArea>
         <NavLink to={{pathname: "/members/posts", state: {searchItem: null}}} exact activeClassName="menu-selected" ><NavLinks>Posts</NavLinks></NavLink>

         <NavLink exact to="/members/createpost" activeClassName="menu-selected"><NavLinks>Create Post</NavLinks></NavLink>
         <NavLink exact to="/members/myposts" activeClassName="menu-selected"><NavLinks>My Posts</NavLinks></NavLink>
         <NavLink exact to="/members/profile" activeClassName="menu-selected"><NavLinks>Profile</NavLinks></NavLink>
         <NavLink exact to="/members/logout" activeClassName="menu-selected"><NavLinks>Logout</NavLinks></NavLink>
      </NavArea>
   )
}




const Nav = ( props ) => {

   const [ member, setMember ] = useState( false )
   const value = useContext( AuthContext )

   useEffect( () => {
      setMember( value.isAuthed )
   } )

   return ( member ) ? <MemeberNav /> : <OpenNav />

}

export default Nav