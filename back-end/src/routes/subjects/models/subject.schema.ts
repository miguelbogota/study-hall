import { Schema } from 'mongoose';

/**
 * Esquema de la materia en MongoDB.
 */
export const SubjectSchema = new Schema({
  code: String,
  name: String,
  description: String,
  tags: [String],
  studentIds: [String],
  teachermId: String,
  classId: String
});
