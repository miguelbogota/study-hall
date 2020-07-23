import { Schema } from 'mongoose';

/**
 * Esquema de un chat en MongoDB.
 */
export const ChatSchema = new Schema({
  personId: String,
  createdAt: Date,
  text: String
});

/**
 * Esquema del usuario en MongoDB.
 */
export const GroupSchema = new Schema({
  code: String,
  videoUrl: String,
  topic: String,
  schedule: {
    dates: Date,
    in: Date,
    out: Date
  },
  chats: [ChatSchema]
});

