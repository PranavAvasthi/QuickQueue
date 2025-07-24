import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  username: string;
  text: string;
  timestamp: number;
  messageType: "user" | "system";
  userId?: mongoose.Types.ObjectId;
}

const MessageSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    timestamp: {
      type: Number,
      required: true,
      default: Date.now,
    },
    messageType: {
      type: String,
      enum: ["user", "system"],
      default: "user",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ timestamp: -1 });
MessageSchema.index({ username: 1 });
MessageSchema.index({ messageType: 1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
