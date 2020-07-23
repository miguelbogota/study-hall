import { Document } from "mongoose";

/**
 * Interfaz representa un usurario en la db.
 */
export interface User extends Document {
  username: string;
  readonly photoUrl: string;
  readonly status: string;
  email: string;
  password: string;

  readonly subjectIds: string[]; // Id de las materia que esta inscrito.
  readonly type: 'teacher' | 'student';
}
