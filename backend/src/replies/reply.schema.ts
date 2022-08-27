import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReplyDocument = Reply & Document;

@Schema()
export class Reply {
  @Prop({ required: true })
  topicId: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);