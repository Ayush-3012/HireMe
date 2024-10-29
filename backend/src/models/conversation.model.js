import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        id: {
          type: String,
          required: true,
        },
        model: {
          type: String,
          required: true,
          enum: ["Employee", "Employer"],
        },
      },
    ],
    lastMessage: {
      type: String,
      default: "",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

conversationSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

export const Conversation = mongoose.model("Conversation", conversationSchema);
