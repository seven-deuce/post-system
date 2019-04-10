const express = require("express")
let app = express()
const fs = require("fs")
const path = require("path")
const urlEncodedParser = express.urlencoded({ extended: false })
const urlEncodedParserJSON = express.urlencoded({ extended: false, type: 'application/json' })
const port = process.env.PORT || 8000
const mongoose = require("mongoose")
const graphqlHTTP = require('express-graphql')
const schema = require("./graphql/schema")
const resolver = require("./graphql/resolver")
const jwtAuth = require("./middlewares/jwtAuth")
const cors = require("cors")
app.use(cors())

//check to see if the user is authenticated or not:
app.use(jwtAuth) 

app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
}))


/* when you want to deploy:

app.use(express.static(path.join(__dirname,"..", ".." , 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,"..", ".." , 'build', 'index.html'));
  });
*/

mongoose.connect('mongodb://localhost/post-system', { useNewUrlParser: true }).then(res => console.log("connected to database")).catch(err => console.log("Your MongoDB setting in the app.js file is not correct. Please change it on: src/server/app.js",err))

app.listen(port, console.log(`app is listening on ${port}`))