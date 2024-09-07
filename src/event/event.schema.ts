import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

export type EventDocument = Event & Document;
@Schema()
export class Event {
  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  heure: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createur: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
