import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Item {
  @Prop()
  name: string;

  @Prop()
  cost: number;

  @Prop({ require: false })
  _id?: Types.ObjectId;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
