const HttpError = require("../models/errorModels");
const postModel = require("../models/postModels");
const UserModel = require("../models/userModels");

const { v4: uuid } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
const userModels = require("../models/userModels");
const postModels = require("../models/postModels");

//.............................CREATE POST
//POST : api/posts
//PROTECTED

const createPost = async (req, res, next) => {
  try {
    const { body } = req.body;
    if (!body) {
      return next(new HttpError("Fill in text field and choose an image"), 422);
    }
    if (!req.files.image) {
      return next(new HttpError("Please choose an image"), 422);
    } else {
      const { image } = req.files;
      //Image should be less than 1mb
      if (image.size > 1000000) {
        return next(
          new HttpError("Image too big. Should be less than 500kb"),
          422
        );
      }
      //rename image
      let fileName = image.name;
      fileName = fileName.split(".");
      fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];
      await image.mv(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
          //store image on cloudinary
          const result = await cloudinary.uploader.upload(
            path.join(__dirname, "..", "uploads", fileName),
            { resourse_type: "image" }
          );
          if (!result.secure_url) {
            return next(new HttpError("Could not upload the image"), 400);
          }
          // save post
          const newPost = await postModel.create({
            creator: req.user.id,
            body,
            image: result.secure_url,
          });
          await UserModel.findByIdAndUpdate(newPost?.creator, {
            $push: { posts: newPost?._id },
          });
          res.json(newPost);
        }
      );
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................GET POST
//GET: api/posts/:id
//PROTECTED

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postModel
      .findById(id)
      .populate("creator")
      .populate({ path: "comments", options: { sort: { createdAt: -1 } } });
    res.json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................GET ALL POSTS
//GET : api/posts
//PROTECTED

const getPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................UPDATE POST
//PATCH : api/posts/:id
//PROTECTED

const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { body } = req.body;
    //get post from db
    const post = await postModel.findById(postId);
    // check if creator is the same as logged in user
    if (post?.creator != req.user.id) {
      return next(
        new HttpError("You are not authorized to update this post"),
        403
      );
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { body },
      { new: true }
    );
    res.json(updatedPost).status(200);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................DELETE POST
//DELETE : api/posts/:id
//PROTECTED

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    //get post from db
    const post = await postModel.findById(postId);
    // check if creator is the same as logged in user
    if (post?.creator != req.user.id) {
      return next(
        new HttpError("You are not authorized to delete this post"),
        403
      );
    }
    const deletedPost = await postModel.findByIdAndDelete(postId);
    await UserModel.findByIdAndUpdate(post?.creator, {
      $pull: { posts: post?._id },
    });
    res.json(deletedPost).status(200);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................Following POST
//GET : api/posts/following
//PROTECTED

const getFollowingPosts = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user.id);
    const posts = await postModels.find({ creator: { $in: user?.following } }); // Get all the post of people we are folowing
    res.json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................LIKE/DISLIKE POST
//GET : api/posts/:id/like
//PROTECTED

const likeDislikePosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postModels.findById(id);
    //check if logged in user has already liked post
    let updatedPost;
    if (post?.likes.includes(req.user.id)) {
      updatedPost = await postModels.findByIdAndUpdate(
        id,
        { $pull: { likes: req.user.id } },
        { new: true }
      );
    } else {
      updatedPost = await postModels.findByIdAndUpdate(
        id,
        { $push: { likes: req.user.id } },
        { new: true }
      );
    }
    res.json(updatedPost);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................GET USER POSTS
//GET : api/users/:id/posts
//PROTECTED

const getUserPosts = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const posts = await userModels
      .findById(userId)
      .populate({ path: "posts", options: { sort: { createdAt: -1 } } });
    res.json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................CREATE BOOKMARK
//GET : api/posts/:id/bookmark
//PROTECTED

const createBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    //get user and check if post already in his bookmarks. if so then remove post, otherwise add post to bookmark
    const user = await userModels.findById(req.user.id);
    const postIsBookmarked = user?.bookmarks?.includes(id);
    if (postIsBookmarked) {
      const userBookmarks = await userModels.findByIdAndUpdate(
        req.user.id,
        { $pull: { bookmarks: id } },
        { new: true }
      );
      res.json(userBookmarks);
    } else {
      const userBookmarks = await userModels.findByIdAndUpdate(
        req.user.id,
        { $push: { bookmarks: id } },
        { new: true }
      );
      res.json(userBookmarks);
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

//.............................GET BOOKMARK
//GET : api/bookmarks
//PROTECTED

const getUserBookmarks = async (req, res, next) => {
  try {
    const userBookmarks = await userModels
      .findById(req.user.id)
      .populate({ path: "bookmarks", options: { sort: { createdAt: -1 } } });
    res.json(userBookmarks);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  getUserBookmarks,
  createBookmark,
  likeDislikePosts,
  getFollowingPosts,
};
