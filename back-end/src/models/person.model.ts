/**
 * Interfaz representa una persona en la db.
 */
export interface Person {
  id: string;
  username: string;
  photoUrl: string;
  status: string;
  email: string;
  password: string;

  subjectIds: string[]; // Id de las materia que esta inscrito.
  type: 'teacher' | 'student';
}
