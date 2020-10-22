import { UserInterface } from 'src/routes/user/models/user.interface';

/**
 * Interfaz de el modelo que se returna cuando el usuario
 * inicia sesion.
 */
export interface AuthUser {
  access_token: string;
  user: UserInterface;
}