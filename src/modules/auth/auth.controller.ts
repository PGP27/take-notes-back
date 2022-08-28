import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginRequest } from './dto/LoginRequest';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginRequest) {
    return this.authService.login(login);
  }
}
