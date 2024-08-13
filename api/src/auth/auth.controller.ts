import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  logout(@Body() loginDto: loginDto) {
    return this.authService.logout(loginDto.email);
  }
}
