import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty()
  @IsNotEmpty()
  login: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
