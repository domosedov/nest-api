import { IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly userId: number;
}
