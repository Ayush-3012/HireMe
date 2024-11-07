import { Conversation } from "../models/conversation.model.js";
import { Employee } from "../models/employee.model.js";
import { Employer } from "../models/employer.model.js";
import { Message } from "../models/message.model.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  const { conversationId, senderId, message } = req.body.messageData;
  let senderModel = null;

  if (await Employee.findById(senderId)) senderModel = "Employee";
  if (await Employer.findById(senderId)) senderModel = "Employer";

  if (!senderModel)
    return res
      .status(400)
      .json({ error: "Sender not found in either Employee or Employer" });

  try {
    const newMessage = new Message({
      conversationId,
      senderId,
      senderModel,
      message,
    });
    await newMessage.save();
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message,
      lastUpdated: Date.now(),
    });
    return res.status(200).json({ message: newMessage });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error sending message" });
  }
};

export const getConversationMessage = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const message = await Message.find({ conversationId }).sort({
      timestamp: 1,
    });
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching message" });
  }
};
