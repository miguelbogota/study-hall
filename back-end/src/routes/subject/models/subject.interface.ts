import { Document } from 'mongoose';

/**
 * Interfaz representa a una materia tanto en la base de datos
 * como en la aplicacion.
 */
export interface SubjectInterface extends Document {
  id: string;
  code: string;
  name: string;
  description: string;
}
