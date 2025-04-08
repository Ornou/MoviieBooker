import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async register(newUser: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: newUser.email },
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: newUser.email,
                password: hashedPassword,
            },
        });

        return user;
        
    }

    async login(credentials: LoginDto) {
        const { email, password } = credentials;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const payload = { sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token, user };

    }
}
