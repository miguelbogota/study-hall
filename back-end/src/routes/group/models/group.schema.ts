import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema del como un grupo se guarda en mongodb.
 */
@Schema()
export class Group extends Document {
  @Prop()
  code: string;

  @Prop()
  videoUrl: string;

  @Prop()
  topic: string;

  @Prop()
  schedule: {
    date: Date;
    in: Date;
    out: Date;
  }

  @Prop()
  subjectId: string;

  @Prop()
  teacherId: string;

  @Prop()
  studentIds: string[];

  @Prop()
  class: number;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
