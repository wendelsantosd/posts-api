import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserPresenter } from '../presenters/user.presenter';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO, @Res() response: Response) {
    const result = await this.userService.create(data);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.CREATED).json({
      message: 'Usuário criado com sucesso!',
      user: new UserPresenter().toPresenter(result.value()),
    });
  }
}
