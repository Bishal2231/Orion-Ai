import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  prompt: string;
  response: string;
  aiModel: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema: Schema = new Schema(
  {
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    aiModel: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
