import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    employerName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageSender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Update the `lastUpdated` timestamp before each save
conversationSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

export const Conversation = mongoose.model("Conversation", conversationSchema);
