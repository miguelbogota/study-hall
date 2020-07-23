export interface Subject {
  code: string;
  name: string;
  description: string;
  tags: string[];

  studentIds: string[]; // Id de estudiantes
  teachermId: string; // Id profesor o moderador
  classId: string; // Id para el chat de la clase
}
