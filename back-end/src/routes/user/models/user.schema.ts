import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema del como un usuario se guarda en mongodb.
 */
@Schema()
export class User extends Document {
  @Prop()
  uid: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  status: string;

  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop()
  photoUrl: string;

  @Prop()
  subjectIds: string[];

  @Prop({ default: 'student' })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
