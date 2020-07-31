import { UserInterface } from './user.model';

/**
 * Interfaz de el modelo que se returna cuando el usuario
 * inicia sesion.
 */
export interface AuthInterface {
  access_token: string;
  user: UserInterface;
}
