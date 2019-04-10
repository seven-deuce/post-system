Posting and Commenting System by React.js
To run the project, use: npm start
A live demo could be seen here:
The client-side entrance file is located at : src/index.js
The server-side entrance file is located at: /src/server/app.js
In order to run it locally, you must change the mongoDB settings on the file above.
Here is a general explanation:
Features:
•	Auth
o	Register
o	Log in
o	Log out
•	Profile
o	View own profile
•	Post
o	Users can add posts
o	Users can comment on their own or other people's posts
•	All Posts (posts from all users)
o	Listing
o	Search (in title and description)
o	Each post in the list must have:
	title
	description
	link to go single post view
	all comments count
•	Single Post View
o	Users can view post details where all comments will be listed (No need for nested comments, one level comments are just fine)
o	Viewer can add comment to post in this page.
•	Manage own posts - CRUD (no need comments here, just basic fields)
o	List
o	View
o	Create
o	Edit
o	Delete
Main Models and Basic Fields
•	User
o	firstName
o	lastName
o	email
o	password
o	created
o	modified
•	Post
o	title
o	description
o	created
o	modified
•	Comment
o	text
o	created
o	modified
Technologies
Backend:
•	express
•	express-graphql
•	mongodb (mongoose)
•	graphql.js
•	jwt (for authorization)
Frontend:
•	React
•	React Router
•	Apollo Client
•	Styled Components

