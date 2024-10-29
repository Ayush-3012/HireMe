import { Conversation } from "../models/conversation.model.js";
import mongoose from "mongoose";

export const createConversation = async (req, res) => {
  const { employeeId, employerId } = req.body;
  try {
    const participants = [
      { id: employeeId, model: "Employee" }, // Employee participant
      { id: employerId, model: "Employer" }, // Employer participant
    ];

    let conversation = await Conversation.findOne({
      participants: {
        $all: participants,
      },
    });
    if (!conversation) {
      conversation = new Conversation({ participants });
      await conversation.save();
    }
    return res.status(200).json({ conversation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating conversation" });
  }
};

export const getUserConversation = async (req, res) => {
  const { userId } = req.body;

  try {
    const conversation = await Conversation.find({
      participants: { $elemMatch: { id: userId } },
    }).sort({ lastUpdated: -1 });

    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversations" });
  }
};
