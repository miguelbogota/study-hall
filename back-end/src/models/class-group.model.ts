/**
 * Interfaz representa una clase en la db.
 */
export interface ClassGroup {
  id: string;
  videoUrl: string;
  topic: string;
  schedule: {
    dates: Date[];
    in: Date;
    out: Date;
  }

  chats: Chat[]; // Subcollection
}

/**
 * Interfaz representa una mensjae en la clase de la db.
 */
export interface Chat {
  id: string;
  personId: string;
  createdAt: Date;
  text: string;
}
