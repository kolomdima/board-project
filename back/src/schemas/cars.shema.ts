import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ timestamps: true})
export class Car {
  @Prop()
  model: string;

  @Prop()
  country: string;

  @Prop()
  miliage: number;

  @Prop()
  power: number;

  @Prop()
  color: string;

  @Prop()
  price: number;

  @Prop()
  fuel: string;

  @Prop()
  steeringWheel: string;

  @Prop()
  year: number;

  @Prop()
  transmission: string;

  @Prop()
  condition: string;

  @Prop()
  volume: number;

  @Prop()
  body: string;

  @Prop()
  story: string;

}



export const CarSchema = SchemaFactory.createForClass(Car);