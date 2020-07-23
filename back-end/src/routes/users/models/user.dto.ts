/**
 * Información requerida para crear un usuario.
 */
export class CreateUserDTO {
  username: string;
  readonly photoUrl: string;
  readonly status: string;
  email: string;
  password: string;

  readonly subjectIds: string[];
  readonly type: 'teacher' | 'student';
}