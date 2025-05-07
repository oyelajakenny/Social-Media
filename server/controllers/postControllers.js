const HttpError = require("../middleware/errorMiddleware");
const postModel = require("../models/postModels");
const UserModel = require("../models/userModels")

const {v4: uuid} = require("uuid")
const cloudinary = require("../utils/cloudinary")
const fs = require("fs")
const path = require("path")



//.............................CREATE POST
//POST : api/posts
//PROTECTED

const createPost = async(req, res, next) =>{
    try {
        const {body} = req.body;
        if(!body){
            return next(new HttpError("Fill in text field and choose an image"), 422)
        }
        if(!req.files.image){
            return next(new HttpError("Please choose an image"), 422)
        }else{
            const {image} = req.files;
            //Image should be less than 1mb
            if(image.size > 1000000){
                return next(new HttpError("Image too big. Should be less than 500kb"), 422)
            }
            //rename image
            let fileName = image.name;
            fileName = fileName.split(".");
            fileName = fileName[0] + uuid() + "." + fileName[fileName.length -1]
            await image.mv(path.join(__dirname, '..', 'uploads', fileName), async(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
                //store image on cloudinary
                const result = await cloudinary.uploader.upload(path.join(__dirname, '..', 'uploads', fileName), {resourse_type: "image"})
                if(!result.secure_url){
                    return next(new HttpError("Could not upload the image"), 400)
                }
                // save post
                const newPost = await postModel.create({creator: req.user.id, body, image: result.secure_url})
                await UserModel.findByIdAndUpdate(newPost?.creator, {$push: {posts: newPost?._id}})
                res.json(newPost)
            })
        }
    } catch (error) {
        return next(new HttpError(error))
    }
}



//.............................GET POST
//GET: api/posts/:id
//PROTECTED

const getPost = async(req, res, next) =>{
    try {
        res.json("Get Post")
    } catch (error) {
        return next(new HttpError(error))
    }
}




//.............................GET ALL POSTS
//GET : api/posts
//PROTECTED

const getPosts = async(req, res, next) =>{
    try {
        res.json("Get All Posts")
    } catch (error) {
        return next(new HttpError(error))
    }
}




//.............................UPDATE POST
//PATCH : api/posts/:id
//PROTECTED

const updatePost = async(req, res, next) =>{
    try {
        res.json("Update Post")
    } catch (error) {
        return next(new HttpError(error))
    }
}




//.............................DELETE POST
//DELETE : api/posts/:id
//PROTECTED

const deletePost = async(req, res, next) =>{
    try {
        res.json("Delete Post")
    } catch (error) {
        return next(new HttpError(error))
    }
}




//.............................Following POST
//GET : api/posts/following
//PROTECTED

const getFollowingPosts = async(requestAnimationFrame, res, next) =>{
    try {
        res.json("Get Following Posts")
    } catch (error) {
        return next(new HttpError(error))
    }
}


//.............................LIKE/DISLIKE POST
//GET : api/posts/:id/like
//PROTECTED

const likeDislikePosts = async(req, res, next) =>{
    try {
        res.json("Like/Dislike Posts")
    } catch (error) {
        return next(new HttpError(error))
    }
}


//.............................GET USER POSTS
//GET : api/users/:id/posts
//PROTECTED

const getUserPosts = async(req, res, next) =>{
    try {
        res.json("Get User Posts")
    } catch (error) {
        return next(new HttpError(error))
    }
}

//.............................CREATE BOOKMARK
//GET : api/posts/:id/bookmark
//PROTECTED

const createBookmark = async(req, res, next) =>{
    try {
        res.json("Create Bookmark")
    } catch (error) {
        return next(new HttpError(error))
    }
}

//.............................GET BOOKMARK
//GET : api/bookmarks
//PROTECTED

const getUserBookmarks = async(req, res, next) =>{
    try {
        res.json("Get Bookmarks")
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {createPost, updatePost, deletePost, getPost, getPosts, getUserPosts, getUserBookmarks, createBookmark, likeDislikePosts, getFollowingPosts}