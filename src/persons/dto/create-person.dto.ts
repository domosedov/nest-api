import { Prisma } from '.prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreatePersonDto implements Prisma.PersonCreateInput {
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
