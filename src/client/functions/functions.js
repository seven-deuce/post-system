import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import gql from "graphql-tag";



const f = {}

//the key used for setting  token on client's localStorage:
const tokenKey = "pst"

//the key used for setting  current url on client's localStorage:
const urlKey = "pst-route"


f.verifyToken = ( token = f.readToken() ) => {

   const client = new ApolloClient( {
      cache: new InMemoryCache(),
      link: new HttpLink()
   } )

   return client
      .query( {
         query: gql `
         query {
          verifyToken(token: "${token}" ) {
           userId
           email
           exp
         }
       }`
      } )
      .then( res => {
         try {
            return res.data.verifyToken
         } catch ( err ) {
            return null
         }

      } )
      .catch( err => null )

}

f.recordUrl = ( url = "" ) => {
   sessionStorage.setItem( urlKey, url )
   return true
}
f.readUrl = (key = urlKey) => {
  const url = sessionStorage.getItem( key )
   if ( !url ) { return null } else { return url }
}

f.sliceText = ( title, description ) => {
   //takes the title and description as 2 strings, and returns
   //the a short snippet for display in all-posts view
   let shortTitle = (title.length > 50) ? title.slice( 0, 50 ).concat( "..." ) : title
   let shortDesc = (description.length > 200) ? description.slice( 0, 200 ).concat( "..." ) : description
   return {
      shortTitle,
      shortDesc
   }
}

f.writeToken = ( token, key = tokenKey ) => {
   localStorage.setItem( key, token )
   return true;
}

f.readToken = ( key = tokenKey ) => {
   const token = localStorage.getItem( key )
   if ( !token ) { return null } else { return token }
}


f.fetchData = ( requestBody ) => {

   return fetch( "http://localhost:8000/graphql", {
         method: "post",
         body: JSON.stringify( requestBody ),
         headers: {
            "Content-Type": "application/json"
         }
      } )
      .then( res => res.json() )
      .then( res => {
         try {
            return res.data.verifyToken
         } catch ( err ) {
            return null
         }
      } )
      .catch( err => console.log( err ) )

}

f.verifyTokenClassic = ( token = f.readToken() ) => {

   let requestBody = {
      query: `
         query {
          verifyToken(token: "${token}" ) {
           userId
           email
           exp
         }
       }`
   }
   return f.fetchData( requestBody )
}

f.purify= (string) => {
  return string.replace(/</g, "-").replace(/>/g, "-").replace(/\n/g, "<br>").trim().replace(/script/gi, "")
}




export default f