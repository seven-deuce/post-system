import React, { useState, useEffect } from "react"
import { BrowserRouter, Redirect } from "react-router-dom"
import styledComponents from "./styled-components/styledComponents"
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Nav from "./components/nav"
import Routes from "./components/routes"
import AuthContext from "./context/AuthContext"
import functions from "./functions/functions"

const { Wrapper } = styledComponents
const { verifyToken, readToken, writeToken, readUrl } = functions

const httpLink = new HttpLink({uri: "http://localhost:8000/graphql"});
const authLink = new ApolloLink( ( operation, forward ) => {
   const token = readToken();
   operation.setContext( {
      headers: {
         Authorization: token ? `Bearer ${token}` : ''
      }
   } );
   return forward( operation );
} );


const App = () => {

   const client = new ApolloClient( {
      link: authLink.concat( httpLink ), // Chain it with the HttpLink
      cache: new InMemoryCache(),
      defaultOptions: {
         watchQuery: {
            errorPolicy: 'all'
         },
         query: {
            errorPolicy: 'all',
         },
         mutate: {
            errorPolicy: 'all'
         }
      }
   } );

   const [ auth, setAuth ] = useState( { userId: null, email: null, exp: null } )
   const [ isAuthed, setIsAuthed ] = useState( false )

   const login = ( { userId, email, exp } ) => {
      setAuth( { userId, email, exp } )
      setIsAuthed( true )
      futureVerification( exp )
   }
   const logout = () => {
      setAuth( { userId: null, email: null, exp: null } )
      setIsAuthed( false )
      writeToken( "null" )
   }

   const futureVerification = ( exp ) => {
      const difference = ( ( exp * 1000 ) - ( new Date().getTime() ) ) + 10000
      setTimeout( () => {
         verifyToken().then( res => { if ( !res ) { logout() } } )
            .catch( err => console.log( err ) )
      }, difference )
   }

   //persist url on page refresh
   useEffect( () => {
      const prevUrl = readUrl();
      if ( prevUrl ) { return <Redirect to="{prevUrl}" /> }
   }, [] )

   useEffect( () => {
      verifyToken().then( res => {
         if ( res ) { login( res ) }
      } )
   }, [] )


   return (
      <BrowserRouter>
         <ApolloProvider client={client}>
            <AuthContext.Provider value={ {auth, login, logout, isAuthed, client} } >
               <Wrapper>
                  <Nav />
                  <Routes />
               </Wrapper>
            </AuthContext.Provider>
         </ApolloProvider>
      </BrowserRouter>
   )
}




export default App