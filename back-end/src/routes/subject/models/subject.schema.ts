import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema del como una materia se guarda en mongodb.
 */
@Schema()
export class Subject extends Document {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
