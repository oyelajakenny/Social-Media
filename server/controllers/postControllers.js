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
        res.json("create Post")
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
        res.json("create Post")
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