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
  
  @Prop({ required: [true, 'Le nom est obligatoire'], minlength: [1, 'Le nom doit avoir au moins 1 caractère'], maxlength: 255 })
  nom: string;

  @Prop({ required: [true, 'Le prénom est obligatoire'], minlength: [1, 'Le prénom doit avoir au moins 1 caractère'], maxlength: 255 })
  prenom: string;

  @Prop({
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Le format de l\'email est invalide'],
  })
  email: string;

  @Prop({
    required: [true, 'Le numéro de téléphone est obligatoire'],
    unique: true,
    match: [/^(\+237)\s?(6[5789][0-9]{7})$/, 'Le format du numéro de téléphone est invalide et cest du comeroun aet de l opperateur orange '],
  })
  numero_de_telephone: string;

  @Prop({ required: [true, 'Le mot de passe est obligatoire'] })
  mot_de_passe: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
