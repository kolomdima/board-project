import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Cars {
  @ApiProperty()
  @IsNotEmpty()
  model: string;
  @ApiProperty()
  @IsNotEmpty()
  country: string;
  @ApiProperty({ type: 'integer' })
  @IsNumber()
  miliage: number;
  @ApiProperty()
  @IsNumber()
  power: number;
  @ApiProperty()
  @IsNotEmpty()
  color: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNotEmpty()
  fuel: string;
  @ApiProperty()
  @IsNotEmpty()
  steeringWheel: string;
  @ApiProperty()
  @IsNumber()
  year: number;
  @ApiProperty()
  @IsString()
  transmission: string;
  @ApiProperty()
  @IsString()
  condition: string;
  @ApiProperty()
  @IsNumber()
  volume: number;
  @ApiProperty()
  @IsString()
  body: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
