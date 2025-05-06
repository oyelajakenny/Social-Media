const HttpError = require('../models/errorModels')
const userModels = require('../models/userModels')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const uuid = require('uuid').v4;
const cloudinary = require('../utils/cloudinary')
const fs = require('fs');
const path = require('path')

//========================REGISTER USER
//POST : api/users/register
//UNPROTECTED

const registerUser = async(req, res, next)=>{
try {
    const {fullName, email, password, confirmPassword} = req.body;
    if(!fullName || !email || !password || !confirmPassword){
        return next(new HttpError("Fill in all fields", 422))
    }
    //make the email lowercased
    const lowerCasedEmail = email.toLowerCase();
    //check DB if email already exist
    const emailExists = await userModels.findOne({email: lowerCasedEmail})
    if(emailExists){
        return next(new HttpError("Email already exists", 422))}
        //check if password and confirm password match
        if(password != confirmPassword){
            return next(new HttpError("Passwords do not match", 422))
        }
        //check password length
        if(password.length < 8){
            return next(new HttpError("Password should be at least 8 characters", 422))
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //add  user
        const newUser = await userModels.create({fullName, email:lowerCasedEmail, password: hashedPassword})
        res.json(newUser).status(201);
} catch (error) {
    return next(new HttpError(error))
}
}














//========================LOGIN USER
//POST : /users/login
//UNPROTECTED

const loginUser = async(req, res, next)=>{
try {
    const {email, password}= req.body
    if(!email || !password){
        return next(new HttpError("Fill in all fields", 422))
    }

    //make email lowercased
    const lowerCasedEmail = email.toLowerCase();
    //fetch user from DB
    const user = await userModels.findOne({email: lowerCasedEmail})
    if(!user){
        return next(new HttpError("Invalid Credentials", 422))
    }
    // const {uPassword, ...userInfo}= user;
    //compare password

    const comparedPassword = await bcrypt.compare(password, user?.password);
    if(!comparedPassword){
        return next(new HttpError("Invalid Credentials", 422))
    }
    const token = await jwt.sign({id: user?._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    //res.json({token, id: user?._id, ...userInfo}).status(200);
    res.json({ token, id: user?._id }).status(200);
}


catch (error) {
    return next(new HttpError(error))
}
}

















//========================GET USER
//GET : api/users/:id
//PROTECTED

const getUser = async(req, res, next)=>{
try {
    const {id} = req.params;
    const user = await userModels.findById(id)
    if(!user){
        return next(new HttpError("User not found", 422))
    }
    res.json(user).status(200)
} catch (error) {
    return next(new HttpError(error))
}
}







//========================GET USERS
//GET : api/users
//PROTECTED

const getUsers = async(req, res, next)=>{
try {
//    const users = await userModels.find().limit(10).sort({createdAt})
    const users = await userModels.find();
   res.json(users)
} catch (error) {
    return next(new HttpError(error))
}
}




//========================EDIT USER
//PATCH : api/users/edit
//PROTECTED

const editUser = async(req, res, next)=>{
try {
   const {fullName, bio} = req.body;
   const editedUser = await userModels.findByIdAndUpdate(req.user.id, {fullName, bio}, {new: true})
   res.json(editedUser).status(200)
} catch (error) {
    return next(new HttpError(error))
}
}

//========================FOLLOW/UNFOLLOW USER
//GET : api/users/:id/follow-unfollow
//PROTECTED

const followUnfollowUser = async(req, res, next)=>{
try {
    const userToFollowId = req.params.id;
    if(req.user.id === userToFollowId){
        return next(new HttpError("You cannot follow/Unfollow yourself", 422))
    }
    const currentUser = await userModels.findById(req.user.id);
    const isFollowing = currentUser?.following?.includes(userToFollowId);
    //follow if not following, else unfollow if already following
    if(!isFollowing){
        const updatedUser = await userModels.findByIdAndUpdate(userToFollowId, {$push:{followers: req.user.id}}, {new: true})
        await userModels.findByIdAndUpdate(req.user.id, {$push: {following: userToFollowId}}, {new: true})
        res.json(updatedUser)
    }else{
        const updatedUser = await userModels.findByIdAndUpdate(userToFollowId, {$pull:{followers: req.user.id}}, {new: true})
        await userModels.findByIdAndUpdate(req.user.id, {$pull: {following: userToFollowId}}, {new: true})
        res.json(updatedUser)
    }
} catch (error) {
    return next(new HttpError(error))
}
}

//========================CHANGE USER PHOTO
//POST : api/users/avatar
//PROTECTED

const changeUserAvatar = async(req, res, next)=>{
try {
    if(!req.files.avatar){
        return next(new HttpError("Please choose an image", 422))
    }
    const {avatar} = req.files;
    //check file size
    if(avatar.size > 500000){
        return next(new HttpError("Profile picture too big. Should be less than 500kb", 422))
    }
    let fileName = avatar.name;
    let splittedFileName = fileName.split('.')
    let newFilename = splittedFileName[0]+uuid() + '.' + splittedFileName[splittedFileName.length - 1]
    avatar.mv(path.join(__dirname, "..", "uploads", newFilename), async (err)=>{
        if(err){
            return next(new HttpError("Image could not be uploaded", 422))
        }
        //upload to cloudinary
        const result = await cloudinary.uploader.upload(path.join(__dirname, "..", "uploads", newFilename),{resourse_type: "image"});
        if(!result.secure_url){
            return next(new HttpError("Image couldn't be uploaded", 422))
        }
        const updatedUser = await userModels.findByIdAndUpdate(req.user.id, {profilePhoto: result?.secure_url}, {new: true})
        res.json(updatedUser).status(200)
    })
} catch (error) {
    return next(new HttpError(error))
}
}

module.exports = {registerUser, loginUser, getUser, getUsers, editUser, followUnfollowUser, changeUserAvatar}