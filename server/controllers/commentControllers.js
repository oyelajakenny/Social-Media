const HttpError = require("../models/errorModels")
const commentModel = require("../models/commentsModels")
const postModel = require("../models/postModels")
const UserModel = require("../models/userModels")


//.............................CREATE COMMENT
//POST : api/comments/:Id
//PROTECTED

const createComment =async (req, res, next)=>{
    try {
        const {postId} = req.params;
        const {comment} = req.body;
        if(!comment){
            return next(new HttpError("Please write a comment"), 422)
        }
        //get comment creator from db
        const commentCreator = await UserModel.findById(req.user.id)
        const newComment = await commentModel.create({creator: {creatorId: req.user.id, creatorName: commentCreator?.fullName, creatorPhoto:commentCreator?.profilePhoto}, comment, postId})
        await postModel.findByIdAndUpdate(postId, {$push: {comments: newComment?._id}}, {new: true})
        res.json(newComment)
    } catch (error) {
        return next(new HttpError)
    }
}

//.............................GET POST COMMENT
//POST : api/comments/:postId
//PROTECTED

const getPostComments =async (req, res, next)=>{
    try {
       const {postId} = req.params;
       const comments = await postModel.findById(postId).populate({path:"comments", options:{sort: {createdAt:-1}}})
       res.json(comments)
    } catch (error) {
        return next(new HttpError)
    }
}

//.............................DELETE COMMENT
//POST : api/comments/:commentId
//PROTECTED

const deleteComments =async (req, res, next)=>{
    try {
        res.json("Delete comments")
    } catch (error) {
        return next(new HttpError)
    }
}

module.exports={createComment, getPostComments, deleteComments}