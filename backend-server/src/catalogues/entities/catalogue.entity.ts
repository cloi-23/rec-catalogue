import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Catalogue extends Document {
  @Prop({ required: true })
  item: string;

  @Prop({ required: true })
  supplier: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;
}
export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);
