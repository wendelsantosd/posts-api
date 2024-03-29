import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CategoryPresenter } from '../presenters/category.presenter';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dtos/createCategory.dto';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() data: CreateCategoryDTO,
    @Res() response: Response,
  ) {
    const result = await this.categoryService.create(data);

    if (result.isFail())
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: result.error() });

    return response.status(HttpStatus.CREATED).json({
      message: 'Categoria criada com sucesso!',
      category: new CategoryPresenter().toPresenter(result.value()),
    });
  }
}
