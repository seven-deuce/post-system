const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	approved: {
		type: Boolean,
		required: true
	},
	createdPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Post"
		}
	],
	createdComments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
}, {timestamps: true})


module.exports = mongoose.model("User", userSchema)