import { Schema } from 'mongoose';

/**
 * Esquema de un chat en MongoDB.
 */
export const ChatSchema = new Schema({
  personId: String,
  createdAt: { type: Date, default: Date.now },
  text: String,
  isModerator: Boolean
});

/**
 * Esquema del usuario en MongoDB.
 */
export const GroupSchema = new Schema({
  code: String,
  videoUrl: String,
  topic: String,
  schedule: {
    date: Date,
    in: Date,
    out: Date
  },
  chats: [ChatSchema]
});

