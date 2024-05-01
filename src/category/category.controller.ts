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

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Req() req: Request, @Body() data: CreateCategoryDto) {
    return await this.categoryService.createCategory(req, data.name);
  }

  @Get()
  getCategory() {
    return this.categoryService.getCategory();
  }

  @Patch('/:categoryId')
  updateCategory(
    @Req() req: Request,
    @Param('categoryId') categoryId: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(
      req,
      categoryId,
      data.name,
      data.order,
    );
  }

  @Delete('/:categoryId')
  deleteCategory(@Req() req: Request, @Param('categoryId') categoryId: number) {
    return this.categoryService.deleteCategory(req, categoryId);
  }
}
