import { User } from '@modules/user/domain/user.aggregate';
import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Req() request: Request, @Res() response: Response) {
    const result = this.authService.login(request.user as User);

    if (result.isFail())
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      token: result.value(),
    });
  }
}
