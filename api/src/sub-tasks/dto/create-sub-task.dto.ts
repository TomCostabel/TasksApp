import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubTaskDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsBoolean()
  @IsNotEmpty()
  subTaskCheck: boolean;
}
