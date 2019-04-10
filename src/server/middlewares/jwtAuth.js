const jwt = require( "jsonwebtoken" )

module.exports = ( req, res, next ) => {

   //looking up for Authorization in the incoming request's header:
   const authInHeader = req.get( "Authorization" )

   if ( !authInHeader ) {
      //I will add "authenticated" prop to req object and make it available through
      //all request handlers:
      req.authenticated = false;
      return next()
   }

   const token = authInHeader.split( " " )[ 1 ]
   if ( !token || token == " " ) { req.authenticated = false; return next() }

   let decodedToken;
   try { decodedToken = jwt.verify( token, "secretHash" ) } catch ( err ) { req.authenticated = false; return next() }

   if ( !decodedToken ) { req.authenticated = false; return next() }

   //if it passes all the checks:
   req.authenticated = true;
   req.decodedToken = decodedToken

   next()
}