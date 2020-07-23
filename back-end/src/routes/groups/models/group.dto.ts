import { Chat } from "./group.interface";

/**
 * Información requerida para crear un mensaje.
 */
export class CreateChatDTO {
  readonly personId: string;
  readonly createdAt: Date;
  readonly text: string;
  readonly isModerator: boolean;
}

/**
 * Información requerida para crear un grupo o clase.
 */
export class CreateGroupDTO {
  readonly code: string;
  readonly videoUrl: string;
  readonly topic: string;
  readonly schedule: {
    readonly date: Date;
    readonly in: Date;
    readonly out: Date;
  };
  chats: Chat[];
}
