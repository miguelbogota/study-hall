/**
 * Información requerida para crear un usuario.
 */
export class CreateUserDTO {
  readonly username: string;
  readonly photoUrl: string;
  readonly status: string;
  readonly email: string;
  readonly password: string;

  readonly subjectIds: string[];
  readonly type: 'teacher' | 'student';
}