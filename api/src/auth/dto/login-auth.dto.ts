import { IsNotEmpty, IsString } from 'class-validator';

export class loginDto {

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
