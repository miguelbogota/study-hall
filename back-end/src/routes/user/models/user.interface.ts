import { Document } from 'mongoose';

/**
 * Interfaz representa a un usuario tanto en la base de datos
 * como en la aplicacion.
 */
export interface UserInterface extends Document {
  uid: string;
  username: string;
  password: string;
  status: string;
  displayName: string;
  email: string;
  photoUrl: string;

  subjectIds: string[]; // Id de las materia que esta inscrito.
  type: 'student' | 'teacher';
}
