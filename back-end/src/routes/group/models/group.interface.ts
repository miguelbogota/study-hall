import { Document } from 'mongoose';

/**
 * Interfaz representa a un grupo tanto en la base de datos
 * como en la aplicacion.
 */
export interface GroupInterface extends Document {
  id: string;
  code: string;
  videoUrl: string;
  topic: string;
  schedule: {
    date: Date;
    in: Date;
    out: Date;
  };

  subjectId: string;
  teacherId: string;
  studentIds: string[];
  class: number;
}
