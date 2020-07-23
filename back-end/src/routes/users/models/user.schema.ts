import { Schema } from 'mongoose';

/**
 * Esquema del usuario en MongoDB.
 */
export const UserSchema = new Schema({
  username: String,
  photoUrl: String,
  status: String,
  email: String,
  password: String,

  subjectIds: [String],
  type: String
});
