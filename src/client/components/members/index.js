import React  from "react"
import fn from "../../functions/functions"


import Posts from "./posts"
import CreatePost from "./createpost"
import MyPosts from "./myposts"
import Profile from "./profile"
import Logout from "./logout"
import NotFound from "../notfound"

const { recordUrl } = fn

const Member = ( props ) => {
   const page = props.match.params.page

   switch ( page ) {
     

      case "posts":
      recordUrl(props.match.url)
      return ( <Posts {...props} /> )
      break;

      case "createpost":
      recordUrl(props.match.url)
      return ( <CreatePost {...props} /> )
      break;

      case "myposts":
      recordUrl(props.match.url)
      return ( <MyPosts {...props} /> )
      break;

      case "profile":
      recordUrl(props.match.url)
      return ( <Profile {...props} /> )
      break;

      case "logout":
      recordUrl(props.match.url)
      return ( <Logout {...props} /> )
      break;

      default:
      recordUrl(props.match.url)
      return ( <NotFound {...props} /> )
   }

}



export default Member