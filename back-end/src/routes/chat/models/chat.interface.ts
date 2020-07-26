import { Document } from 'mongoose';

/**
 * Interfaz representa a un chat tanto en la base de datos
 * como en la aplicacion.
 */
export interface ChatInterface extends Document {
  id: string;
  text: string;
  createAt: Date;
  uid: string;
  groupId: string;
}
