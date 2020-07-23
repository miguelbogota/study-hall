import { Document } from "mongoose";

/**
 * Interfaz representa un usurario en la db.
 */
export interface User extends Document {
  readonly username: string;
  readonly photoUrl: string;
  readonly status: string;
  readonly email: string;
  readonly password: string;

  readonly subjectIds: string[]; // Id de las materia que esta inscrito.
  readonly type: 'teacher' | 'student';
}
