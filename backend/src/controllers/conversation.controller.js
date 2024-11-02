import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const createConversation = async (req, res) => {
  const { employeeId, employerId, firstMessage } = req.body;
  try {
    const participants = [
      { id: employeeId, model: "Employee" },
      { id: employerId, model: "Employer" },
    ];

    const existingConversation = await Conversation.findOne({
      participants: {
        $all: participants,
      },
    });

    if (existingConversation) {
      return res.status(400).json({ error: "Conversation already exists." });
    }

    const conversation = new Conversation({
      participants,
      lastMessageSender: employerId,
    });
    await conversation.save();

    if (firstMessage) {
      const message = new Message({
        conversationId: conversation._id,
        sender: {
          id: employerId,
          model: "Employer",
        },
        message: firstMessage,
      });

      await message.save();

      conversation.lastMessage = firstMessage;
      conversation.lastUpdated = new Date();
      await conversation.save();
    }

    return res.status(200).json({ conversation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating conversation" });
  }
};

export const getUserConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.find({
      participants: { $elemMatch: { id: userId } },
    })
      .sort({ lastUpdated: -1 })
      .populate("lastMessageSender", "fullName")
      .exec();

    res.status(200).json({ conversations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching conversations" });
  }
};
