import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  const { conversationId, senderId, message } = req.body;

  try {
    const newMessage = new Message({
      conversationId,
      sender: {
        id: senderId,
        model: "Employee",
      },
      message,
    });
    await newMessage.save();
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message,
      lastUpdated: Date.now(),
    });
    res.status(200).json({ message: newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error sending message" });
  }
};

export const getConversationMessage = async (req, res) => {
  const { conversationId } = req.body;

  try {
    const message = await Message.find({ conversationId }).sort({
      timestamp: 1,
    });
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Error fetching message" });
  }
};
