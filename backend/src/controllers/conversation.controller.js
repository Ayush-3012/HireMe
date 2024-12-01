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
    return res.status(200).json({ exists: !!conversation });
  } catch (error) {
    return res.status(500).json({ message: "Error checking conversation" });
  }
};

export const deleteConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const foundConvesation = await Conversation.findById(conversationId);
    if (!foundConvesation)
      return res.status(404).json({ message: "No such conversation found" });

    await Conversation.findByIdAndDelete(conversationId);
    await Message.deleteMany({ conversationId });
    return res.status(200).json({ message: "Conversation and messages deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while deleting conversation" });
  }
};
