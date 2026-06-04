import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  prompt: string;
  response: string;
  model: string;
  createdAt: Date;
}

const ChatSchema: Schema = new Schema(
  {
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
