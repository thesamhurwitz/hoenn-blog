import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthPayload } from './auth-payload';
import { AuthService } from './auth.service';
import { User } from './decorators/user.decorator';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.getJwtToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@User() user: AuthPayload) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@User() user: AuthPayload) {
    return this.authService.getProfile(user);
  }
}
