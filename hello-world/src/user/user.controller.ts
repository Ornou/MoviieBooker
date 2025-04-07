import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
      constructor(private readonly userService: UserService) {}
    
      @Post('auth/login')
      async login(@Body() loginDto:LoginDto) {


      }
    
      @Post('auth/register')
      async register(@Body() registerDto:RegisterDto) {
        
      }
    
      
}
