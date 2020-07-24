export interface Chat {
  personId: string;
  createdAt: Date;
  text: string;
  isModerator: boolean;
}

export interface Group {
  code: string;
  videoUrl: string;
  topic: string;
  schedule: {
    date: Date;
    in: Date;
    out: Date;
  };

  chats: Chat[]; // Subcollection
}
