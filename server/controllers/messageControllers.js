const HttpError = require("../models/errorModels")
const conversationModel = require("../models/conversationModel")
const messageModel = require("../models/messageModel")


//========================CREATE MESSAGE
//POST : api/messages/:receiverId
//PROTECTED

const createMessage = async(req, res, next)=>{
    try {
        res.json("Create Message")
    } catch (error) {
        return next(new HttpError(error))
    }
}


//========================GET MESSAGE
//POST : api/messages/:receiverId
//PROTECTED

const getMessages = async(req, res, next)=>{
    try {
        res.json("Get Messages")
    } catch (error) {
        return next(new HttpError(error))
    }
}



//========================GET CONVERSATIONS
//POST : api/conversations
//PROTECTED

const getConversations = async(req, res, next)=>{
    try {
        res.json("Get Conversations")
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {createMessage, getMessages, getConversations}