import { Injectable } from '@nestjs/common';
import { ExtractJwt,Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET!,
      },
    );
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}