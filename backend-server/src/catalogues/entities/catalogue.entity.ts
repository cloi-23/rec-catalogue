import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Item } from './item.entity';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Catalogue extends Document {
  @Prop({ required: true, type: [Item] })
  items: Types.DocumentArray<Item>;

  @Prop({ required: true })
  supplier: string;

  @Prop({ required: true })
  date: Date;
}
export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);
