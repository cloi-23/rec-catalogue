import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Catalogue extends Document {
  @Prop({ required: true })
  items: ItemDetail[];

  @Prop({ required: true })
  supplier: string;

  @Prop({ required: true })
  date: Date;
}
export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);

class ItemDetail {
  @Prop()
  name: string;

  @Prop()
  cost: number;
}
