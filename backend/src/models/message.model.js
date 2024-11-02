import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    model: {
      type: String,
      required: true,
      enum: ["Employee", "Employer"],
    },
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.pre("save", function (next) {
  if (!this.timestamp) {
    this.timestamp = Date.now();
  }
  next();
});

export const Message = mongoose.model("Message", messageSchema);
