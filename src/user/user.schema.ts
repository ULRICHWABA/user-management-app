import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

@Schema()
export class User {
  [x: string]: any;
  @Prop({ required: true, minlength: 1, maxlength: 255 })
  nom: string;

  @Prop({ required: true, minlength: 1, maxlength: 255 })
  prenom: string;

  @Prop({ required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })
  email: string;

  @Prop({ required: true, unique: true, match: /^(\+237)?(6[579][0-9]{7})$/ })
  numero_de_telephone: string;

  @Prop({ required: true })
  mot_de_passe: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
