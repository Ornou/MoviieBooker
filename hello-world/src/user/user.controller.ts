import { Body, Controller, Post,Get,UseGuards,Req  } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth('Access-Token')
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
    
     @Get ('profile')
     @UseGuards(JwtAuthGuard)
     getProfile(@Req() req) {
        return req.user;
      }
}
