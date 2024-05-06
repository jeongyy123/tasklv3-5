import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '카테고리 생성',
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({
    description: '카테고리를 등록하였습니다.',
  })
  @ApiUnauthorizedResponse({
    description: '사장님만 사용할 수 있는 API입니다.',
  })
  @ApiConflictResponse({
    description: '카테고리가 이미 있습니다.',
  })
  async createCategory(@Req() req: Request, @Body() data: CreateCategoryDto) {
    return await this.categoryService.createCategory(req, data.name);
  }

  @Get()
  @ApiOperation({
    summary: '카테고리 조회',
  })
  getCategory() {
    return this.categoryService.getCategory();
  }

  @Patch('/:categoryId')
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '카테고리 수정',
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({
    description: '카테고리 정보를 수정하였습니다.',
  })
  @ApiUnauthorizedResponse({
    description: '사장님만 사용할 수 있는 API입니다.',
  })
  @ApiConflictResponse({
    description: '카테고리가 이미 있습니다.',
  })
  updateCategory(
    @Req() req: Request,
    @Param('categoryId') categoryId: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(
      req,
      categoryId,
      data.name,
      data.categoryOrder,
    );
  }

  @Delete('/:categoryId')
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '카테고리 삭제',
  })
  @ApiOkResponse({
    description: '카테고리 정보를 삭제하였습니다.',
  })
  @ApiUnauthorizedResponse({
    description: '사장님만 사용할 수 있는 API입니다.',
  })
  @ApiNotFoundResponse({ description: '해당 카테고리가 존재하지않습니다.' })
  deleteCategory(@Req() req: Request, @Param('categoryId') categoryId: number) {
    return this.categoryService.deleteCategory(req, categoryId);
  }
}
