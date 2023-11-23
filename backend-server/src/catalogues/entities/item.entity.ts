import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Item extends Document {
  @Prop()
  name: string;

  @Prop()
  cost: number;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
