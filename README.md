<h1>Posting and Commenting System by React.js</h1>
<p>To run the project, use: <strong>npm start</strong></p>
<p>A live demo could be seen here:</p> <a href="http://post.eu-4.evennode.com/">http://post.eu-4.evennode.com/</a>
<p>The client-side entrance file is located at : src/index.js</p>
<p>The server-side entrance file is located at: /src/server/app.js</p>
<p>In order to run it locally, you must change the mongoDB settings on the file above.</p>
<p>Here is a general explanation:</p>
<p><strong>Features:</strong></p>
<ul>
<li>Auth</li>
<ul>
<li>Register</li>
<li>Log in</li>
<li>Log out</li>
</ul>
<li>Profile</li>
<ul>
<li>View own profile</li>
</ul>
<li>Post</li>
<ul>
<li>Users can add posts</li>
<li>Users can comment on their own or other people's posts</li>
</ul>
<li>All Posts (posts from all users)</li>
<ul>
<li>Listing</li>
<li>Search (in title and description)</li>
<li>Each post in the list must have:</li>
<ul>
<li>title</li>
<li>description</li>
<li>link to go single post view</li>
<li>all comments count</li>
</ul>
</ul>
<li>Single Post View</li>
<ul>
<li>Users can view post details where all comments will be listed (No need for nested comments, one level comments are just fine)</li>
<li>Viewer can add comment to post in this page.</li>
</ul>
<li>Manage own posts - CRUD (no need comments here, just basic fields)</li>
<ul>
<li>List</li>
<li>View</li>
<li>Create</li>
<li>Edit</li>
<li>Delete</li>
</ul>
</ul>
<p><strong>Main Models and Basic Fields</strong></p>
<ul>
<li>User</li>
<ul>
<li>firstName</li>
<li>lastName</li>
<li>email</li>
<li>password</li>
<li>created</li>
<li>modified</li>
</ul>
<li>Post</li>
<ul>
<li>title</li>
<li>description</li>
<li>created</li>
<li>modified</li>
</ul>
<li>Comment</li>
<ul>
<li>text</li>
<li>created</li>
<li>modified</li>
</ul>
</ul>
<p><strong>Technologies</strong></p>
<p>Backend:</p>
<ul>
<li>express</li>
<li>express-graphql</li>
<li>mongodb (mongoose)</li>
<li>graphql.js</li>
<li>jwt (for authorization)</li>
</ul>
<p>Frontend:</p>
<ul>
<li>React</li>
<li>React Router</li>
<li>Apollo Client</li>
<li>Styled Components</li>
</ul>
<p>&nbsp;</p>
