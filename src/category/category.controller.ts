import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
// import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  // createCategory(@Body() data: CreateCategoryDto) {
  createCategory(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Get()
  getCategory() {
    return this.categoryService.getCategory();
  }

  @Patch('/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(
      categoryId,
      data.name,
      data.order,
    );
  }

  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
