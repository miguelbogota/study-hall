export interface User {
  username: string;
  photoUrl: string;
  status: string;
  email: string;
  password: string;

  subjectIds: string[]; // Id de las materia que esta inscrito.
  type: 'teacher' | 'student';
}
