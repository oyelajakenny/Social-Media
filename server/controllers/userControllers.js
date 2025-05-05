const HttpError = require('../models/errorModels')

//========================REGISTER USER
//POST : api/users/register
//UNPROTECTED

const registerUser = async(req, res, next)=>{
try {
    res.json("Register User")
} catch (error) {
    return next(new HttpError(error))
}
}

//========================LOGIN USER
//POST : /users/login
//UNPROTECTED

const loginUser = async(req, res, next)=>{
try {
    res.json("Login User")
} catch (error) {
    return next(new HttpError(error))
}
}

//========================GET USER
//GET : api/users/:id
//PROTECTED

const getUser = async(req, res, next)=>{
try {
    res.json("get User")
} catch (error) {
    return next(new HttpError(error))
}
}

//========================GET USERS
//GET : api/users
//PROTECTED

const getUsers = async(req, res, next)=>{
try {
    res.json("Get Users")
} catch (error) {
    return next(new HttpError(error))
}
}

//========================EDIT USER
//PATCH : api/users/edit
//PROTECTED

const editUser = async(req, res, next)=>{
try {
    res.json("Edit User")
} catch (error) {
    return next(new HttpError(error))
}
}

//========================FOLLOW/UNFOLLOW USER
//GET : api/users/:id/follow-unfollow
//PROTECTED

const followUnfollowUser = async(req, res, next)=>{
try {
    res.json("Follow Unfollow User")
} catch (error) {
    return next(new HttpError(error))
}
}

//========================CHANGE USER PHOTO
//POST : api/users/avatar
//PROTECTED

const changeUserAvatar = async(req, res, next)=>{
try {
    res.json("Change User Avatar")
} catch (error) {
    return next(new HttpError(error))
}
}

module.exports = {registerUser, loginUser, getUser, getUsers, editUser, followUnfollowUser, changeUserAvatar}