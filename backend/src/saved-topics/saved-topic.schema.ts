import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SavedTopicDocument = SavedTopic & Document;

@Schema()
export class SavedTopic {
  @Prop({ required: true })
  topicId: string;

  @Prop({ required: true })
  ownerId: string;
}

export const SavedTopicSchema = SchemaFactory.createForClass(SavedTopic);
