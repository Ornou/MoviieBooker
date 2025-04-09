import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'John Doe' })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'user@example.com' })
  readonly email: string;

  @IsNotEmpty()
//  @IsStrongPassword()
  @ApiProperty({ default: 'password' })
  readonly password: string;
}