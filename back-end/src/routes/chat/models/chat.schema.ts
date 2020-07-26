import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema del como un chat se guarda en mongodb.
 */
@Schema()
export class Chat extends Document {
  @Prop()
  text: string;

  @Prop({ default: new Date() })
  createAt: Date;

  @Prop()
  uid: string;

  @Prop()
  groupId: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
