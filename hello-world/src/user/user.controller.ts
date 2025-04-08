import { Body, Controller, Post,  } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
      constructor(private readonly userService: UserService) {}
    
      @Post('auth/login')
      async login(@Body() credentials:LoginDto) {
        return this.userService.login(credentials);
      }
    
      @Post('auth/register')
      async register(@Body() newUser:RegisterDto) {
        return this.userService.register(newUser);
      }
    
      
}
