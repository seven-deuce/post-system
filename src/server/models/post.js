const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
}, {timestamps: true})


module.exports = mongoose.model("Post", postSchema)