const { buildSchema } = require("graphql")

module.exports = buildSchema(`
		
		type AuthData {
			userId: ID!
			email: String!
			exp: Int!	
			token: String!	
			error: String	
		}
		type Comment {
			_id: ID!
			description: String!
			creator: User!
			creatorName: String!
			post: Post!
			createdAt: String!
			updatedAt: String!
		}

		type Post {
			_id: ID!
			title: String!
			description: String!
			createdAt: String!
			updatedAt: String!
			creator: User!
			comments: [Comment]!
			error: String
		}
		input PostInput {
			title: String!
			description: String!
		}
		type User {
			_id: ID!
			firstName: String!
			lastName: String!
			email: String!
			password: String!
			createdPosts: [Post!]!
			createdComments: [Comment!]!
			createdAt: String!
			approved: Boolean!
		}
		input UserInput {
			firstName: String!
			lastName: String!
			email: String!
			password: String!

		}
		type Check {
			response: Boolean
		}

		type RootQuery {
		verifyToken(token: String!) : AuthData!
		login(email: String!, password: String!) : AuthData!
		getPosts(postId: String, userId: String) : [Post!]!
		getComments(id: String!) : Comment!
		getUser : User!
		checkAuth : Boolean
		}
		type RootMutation {
			createUser(userInput: UserInput) : AuthData!
			createPost(postInput: PostInput) : Post!
			postComment(description: String!, userId: String!, postId: String! ) : Comment!
			editPost(postId: String! , title: String!, description: String!) : Post!
			deletePost(postId: String!, comments: [String!]!) : Post
		}
		schema {
			query: RootQuery
			mutation: RootMutation
		}

		`)