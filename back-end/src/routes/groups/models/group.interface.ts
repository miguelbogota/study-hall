import { Document } from "mongoose";

/**
 * Interfaz representa una mensjae del grupo en la db.
 */
export interface Chat extends Document {
  readonly personId: string;
  readonly createdAt: Date;
  readonly text: string;
}

/**
 * Interfaz representa un grupo en la db.
 */
export interface Group extends Document {
  readonly code: string;
  readonly videoUrl: string;
  readonly topic: string;
  readonly schedule: {
    readonly dates: Date[];
    readonly in: Date;
    readonly out: Date;
  };

  readonly chats: Chat[]; // Subcollection
}
