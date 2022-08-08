import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Cars {
    @IsNotEmpty()
    model: string;
    @IsNotEmpty()
    country: string;
    @IsNumber()
    miliage: number;
    @IsNumber()
    power: number;
    @IsNotEmpty()
    color: string;
    @IsNumber()
    price: number;
    @IsNotEmpty()
    fuel: string;
    @IsNotEmpty()
    steeringWheel: string;
    @IsNumber()
    year: number;
    @IsString()
    transmission: string;
    @IsString()
    condition: string;
    @IsNumber()
    volume: number;
    @IsString()
    body: string;
}























