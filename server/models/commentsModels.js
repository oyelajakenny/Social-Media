const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  creator: {
    type: {
      creatorId: { type: Schema.Types.ObjectId, re: "User" },
      creatorName: {
        type: String,
        required: true,
        creatorPhoto: { type: String, required: true },
      },
    },
  },
  postid: { type: Schema.Types.ObjectId, ref: "Post" },
  comment: { type: String, required: true },
});

module.exports = model("Comment", commentSchema)