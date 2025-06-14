const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  creator: {
    type: {
      creatorId: { type: Schema.Types.ObjectId, re: "User" },
    creatorName: {
      type: String,
      required: true,
    },
    creatorPhoto: { type: String, required: true },
  },
  },  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  comment: { type: String, required: true },
},{timestamps: true});

module.exports = model("Comment", commentSchema)