import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const createConversation = async (req, res) => {
  const {
    employeeId,
    employerId,
    employeeName,
    employerName,
    jobTitle,
    firstMessage,
  } = req.body.newConversation;

  try {
    const existingConversation = await Conversation.findOne({
      employeeId: employeeId,
      employerId: employerId,
      jobTitle: jobTitle,
    });
    if (existingConversation)
      return res.status(400).json({ error: "Conversation already exists." });

    const conversation = new Conversation({
      employeeId: employeeId,
      employerId: employerId,
      employeeName: employeeName,
      employerName: employerName,
      jobTitle: jobTitle,
      lastMessage: firstMessage,
      lastMessageSender: employerId,
    });
    await conversation.save();

    if (firstMessage) {
      const message = new Message({
        conversationId: conversation._id,
        senderId: employerId,
        senderModel: "Employer",
        message: firstMessage,
        timestamp: new Date(),
      });
      await message.save();

      conversation.lastMessage = firstMessage;
      conversation.lastMessageSender = employerId;
      conversation.lastUpdated = new Date();
      await conversation.save();
    }
    return res.status(200).json({ conversation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating conversation" });
  }
};

export const getUserConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.find({
      $or: [{ employeeId: userId }, { employerId: userId }],
    })
      .sort({ lastUpdated: -1 })
      .select("employeeName employerName jobTitle lastMessage lastUpdated")
      .exec();

    res.status(200).json({ conversations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching conversations" });
  }
};

export const checkConversationExists = async (req, res) => {
  const { employerId, employeeId } = req.query;

  try {
    const conversation = await Conversation.findOne({
      employerId,
      employeeId,
    });
    res.status(200).json({ exists: !!conversation });
  } catch (error) {
    res.status(500).json({ message: "Error checking conversation" });
  }
};
