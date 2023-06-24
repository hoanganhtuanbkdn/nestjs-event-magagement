import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './auth.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SessionAuthGuard } from './guards/session-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  // @UseInterceptors(TokenInterceptor)
  signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  signUp(@Body() signInDto: CreateUserDto) {
    return this.authService.create(signInDto);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
