import { Document } from "mongoose";

/**
 * Interfaz representa una materia en la db.
 */
export interface Subject extends Document {
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly tags: string[];

  readonly studentIds: string[]; // Id de estudiantes
  readonly teachermId: string; // Id profesor o moderador
  readonly classId: string; // Id para el chat de la clase
}
