import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  ParseFilePipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDTO } from './dtos/createPost.dto';
import { PostService } from './post.service';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostPresenter, PostsPresenter } from '../presenters/post.presenter';
import { ListParams } from './dtos/listPosts.dto';

export interface User {
  id: string;
}

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createPost(
    @Body() data: CreatePostDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Req() request: Request & { user: User },
    @Res() response: Response,
  ) {
    const image = `${process.env.STATIC_SERVE_URL}/${file.filename}`;
    const userId = request.user.id;

    const result = await this.postService.create(data, image, userId);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.CREATED).json({
      message: 'Postagem criada com sucesso!',
      post: new PostPresenter().toPresenter(result.value()),
    });
  }

  @Get()
  async listPosts(@Query() params: ListParams, @Res() response: Response) {
    const result = await this.postService.list(params);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response
      .status(HttpStatus.OK)
      .json(new PostsPresenter().toPresenter(result.value()));
  }
}
