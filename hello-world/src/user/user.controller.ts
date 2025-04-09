import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Access-Token')
@Controller('user')
export class UserController {
      constructor(private readonly userService: UserService) {}
    
      @Post('auth/login')
      @ApiBody({ 
        type: LoginDto,
        examples: {
          example1: {
            value: {
              email: 'user@example.com',
              password: 'password'
            }
          }
        }
      })
      async login(@Body() credentials: LoginDto) {
        return this.userService.login(credentials);
      }
    
      @Post('auth/register')
      @ApiBody({ 
        type: RegisterDto,
        examples: {
          example1: {
            value: {
              name: 'John Doe',
              email: 'user@example.com',
              password: 'password'
            }
          }
        }
      })
      async register(@Body() newUser: RegisterDto) {
        return this.userService.register(newUser);
      }
    
     @Get ('profile')
     @UseGuards(JwtAuthGuard)
     getProfile(@Req() req) {
        return req.user;
      }
}
