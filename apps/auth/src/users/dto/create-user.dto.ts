import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
