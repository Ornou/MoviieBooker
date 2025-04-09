import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
 
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({default: 'user@example.com'})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({default: 'password'})
  readonly password: string;
}