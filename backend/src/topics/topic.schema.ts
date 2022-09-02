import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TopicDocument = Topic & Document;

@Schema()
export class Topic {
  @Prop({
    required: true,
    unique: true,
  })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
