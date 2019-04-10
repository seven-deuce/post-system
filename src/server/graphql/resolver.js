const Post = require( "../models/post.js" )
const User = require( "../models/user.js" )
const Comment = require( "../models/comment.js" )
const bcrypt = require( "bcryptjs" )
const jwt = require( "jsonwebtoken" )
const verifyToken = require( "../middlewares/jwtAuth-fn" )
const jwtExp = 60 * 60 //seconds
const AuthDataObject = {
   error: "",
   token: "",
   userId: "",
   email: "",
   exp: 0
}
const postObject = {
   _id: "",
   title: "",
   description: "",
   createdAt: "",
   updatedAt: "",
   creator: "",
   comments: []
}


const r = {}

r.createUser = async ( args ) => {
   //check to see if email address already exists?
   const exists = await User.findOne( { email: args.userInput.email } )

   if ( exists ) {
      return { ...AuthDataObject, ...{ error: "The email address is already taken!" } }
   }
   const hashedPassword = await bcrypt.hash( args.userInput.password, 10 /*salt cycle*/ )
   const user = new User( {
      email: args.userInput.email,
      password: hashedPassword,
      firstName: args.userInput.firstName,
      lastName: args.userInput.lastName,
      approved: true,
   } )
   return user.save().then( res => {
      return {
         userId: user.id,
         email: user.email,
         exp: ( new Date().getTime() + ( jwtExp * 1000 ) ),
         token: jwt.sign( { userId: user.id, email: user.email }, "secretHash", {
            expiresIn: jwtExp
         } ),
         error: "",

      }
   } ).catch( err => { console.log( err ); throw err } )
}

r.verifyToken = async ( args ) => {
   // will be either null or an object with valid data
   return verifyToken( args.token )
}

r.login = async ( { email, password } ) => {
   const user = await User.findOne( { email: email } )
   if ( !user ) {
      return { ...AuthDataObject, ...{ error: "Wrong input!" } }
   }
   const passwordMatched = await bcrypt.compare( password, user.password )
   if ( !passwordMatched ) { return { ...AuthDataObject, ...{ error: "Wrong input!" } } }
   const token = await jwt.sign( { userId: user.id, email: user.email }, "secretHash", {
      expiresIn: jwtExp
   } )
   const result = { userId: user.id, email: user.email, token: token, exp: Math.round( ( new Date().getTime() ) / 1000 + jwtExp ), error: "" }

   return result
}

r.createPost = async ( { postInput }, req ) => {
   if ( !req.authenticated ) { throw new Error( "User is not authenticated!" ) }
   const { title, description } = postInput

   const post = new Post( {
      title: title,
      description: description,
      creator: req.decodedToken.userId,
      comments: []
   } )

   return post.save()
      .then( res => {
         User.findById( res.creator ).then( user => {
            user.createdPosts.push( res )
            user.save()
         } )
         return res
      } )
      .then( res => { return { ...res._doc, ...{ error: "" } } } )
      .catch( err => console.log( err ) )
}

r.getPosts = async ( { postId }, req ) => {
   if ( !req.authenticated ) { throw new Error( "User is not authenticated!" ) }
   if ( postId == "all" ) {
      return Post.find().populate( "creator" ).populate( "comments" )
         .then( res => {
            const result = res.map( item => {
               item.creator.password = ""
               return item
            } )
            return result
         } )
   } else if ( postId == "myposts" ) {
      return Post.find( { creator: req.decodedToken.userId } ).populate( "creator" ).populate( "comments" )
   }
}

r.postComment = async ( args ) => {

   const { description, userId, postId } = args
   const creatorName = await User.findById( userId ).then( res => {
      return res.firstName + " " + res.lastName
   } )
   const comment = new Comment( { description, creator: userId, post: postId, creatorName } )

   return comment.save()
      .then( res => {
         Post.findById( res.post ).then( post => {
            post.comments.push( comment )
            post.save()
         } )
         User.findById( res.creator ).then( user => {
            user.createdComments.push( comment )
            user.save()
         } )

         return res
      } )
      .catch( err => console.log( err ) )
}
r.getComments = ( { id }, req ) => {
   if ( !req.authenticated ) { throw new Error( "User is not authenticated!" ) }
   return Comment.findById( id ).populate( "creator" )
}

r.getUser = ( arg, req ) => {
   if ( !req.authenticated ) { throw new Error( "User is not authenticated!" ) }
   return User.findById( req.decodedToken.userId ).then( res => res )
}

r.editPost = ( { postId, title, description }, req ) => {
   if ( !req.authenticated ) { throw new Error( "User is not authenticated!" ) }
   return Post.findOneAndUpdate( { _id: postId }, { title: title, description: description } )

}

r.deletePost = async ( { postId, comments }, req ) => {
   if ( !req.authenticated ) { throw new Error( "User is not authenticated!" ) }
   const deleteComments = await comments.forEach( item => {
      Comment.findOneAndDelete( { _id: item } ).then( res => res ).catch( err => console.log( err ) )
   } )
   const deletePostFromUser = await User.findOneAndUpdate( { _id: req.decodedToken.userId }, { $pull: { createdPosts: postId } } )
   return Post.findOneAndDelete( { _id: postId } )
}

r.checkAuth = ( args, req ) => {
   if ( !req.authenticated ) { return false } else { return true }
}


module.exports = r