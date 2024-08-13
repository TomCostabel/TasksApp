import { IsNotEmpty, IsString } from "class-validator"

export class CreateTaskDto {

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  id: string
}
