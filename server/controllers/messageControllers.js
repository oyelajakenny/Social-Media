const HttpError = require("../models/errorModels")
const conversationModel = require("../models/conversationModel")
const messageModel = require("../models/messageModel")


//========================CREATE MESSAGE
//POST : api/messages/:receiverId
//PROTECTED

const createMessage = async(req, res, next)=>{
    try {
        const {receiverId} = req.params;
        const {messageBody}= req.body;
        //check if there's already a conversation between current user and receiver
        let conversation = await conversationModel.findOne({participants: {$all:[req.user.id, receiverId]}})
        //create a new conversation if none was found
        if(!conversation){
            conversation = await conversationModel.create({participants: [req.user.id, receiverId], lastMessage:{text: messageBody, senderId: req.user.id}})
        }
        //create a new message
        const newMessage = await messageModel.create({conversationId: conversation._id, senderId: req.user.id, text: messageBody})
        await conversation.updateOne({lastMessage: {text: messageBody, senderId: req.user.id}})
        res.json(newMessage)
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